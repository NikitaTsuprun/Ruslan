import dns from 'node:dns/promises'
import nodemailer from 'nodemailer'

// Простейшая защита от спама: ограничение числа заявок с одного IP.
const hits = new Map<string, number[]>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 6

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function clean(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().replace(/\s+/g, ' ').slice(0, maxLength)
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => null)

  // Honeypot: скрытое поле, которое заполняют только боты.
  if (clean(body?.company, 100)) {
    return { ok: true }
  }

  const name = clean(body?.name, 100)
  const phone = clean(body?.phone, 30)
  const way = clean(body?.way, 40)
  const bank = clean(body?.bank, 120)
  // Перевод строк в сообщении сохраняем, остальное чистим.
  const message =
    typeof body?.message === 'string' ? body.message.trim().slice(0, 2000) : ''

  if (name.length < 2 || phone.replace(/\D/g, '').length < 10) {
    return { ok: false, message: 'Проверьте имя и номер телефона.' }
  }

  // Ограничение частоты заявок по IP.
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) {
    return { ok: false, message: 'Слишком много заявок. Попробуйте позже или позвоните нам.' }
  }
  recent.push(now)
  hits.set(ip, recent)

  const config = useRuntimeConfig(event)
  if (!config.mailUser || !config.mailPass || !config.mailTo) {
    console.error('[contact] Почта не настроена: проверьте переменные MAIL_* в .env')
    return { ok: false, message: 'Сейчас форма недоступна. Пожалуйста, свяжитесь по телефону.' }
  }

  const port = Number(config.mailPort) || 587

  // Принудительно резолвим SMTP-хост в IPv4: на части сетей и хостингов
  // маршрут IPv6 недоступен, из-за чего TLS-соединение обрывается.
  let smtpHost = config.mailHost
  let tls: { servername: string } | undefined
  try {
    const resolved = await dns.lookup(config.mailHost, { family: 4 })
    smtpHost = resolved.address
    tls = { servername: config.mailHost }
  } catch {
    // если резолв не удался — подключаемся по имени хоста
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port,
    secure: port === 465,
    requireTLS: port === 587,
    auth: { user: config.mailUser, pass: config.mailPass },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    ...(tls ? { tls } : {}),
  })

  const sentAt = new Date().toLocaleString('ru-RU', {
    timeZone: 'Europe/Moscow',
    dateStyle: 'long',
    timeStyle: 'short',
  })

  const rows: [string, string][] = [
    ['Имя', name],
    ['Телефон', phone],
    ['Способ связи', way || 'не указан'],
    ['Банк', bank || 'не указан'],
    ['Сообщение', message || 'не указано'],
    ['Отправлено', `${sentAt} (МСК)`],
  ]

  const textBody = rows.map(([k, v]) => `${k}: ${v}`).join('\n')

  const htmlRows = rows
    .map(
      ([k, v]) => `
        <tr>
          <td style="padding:11px 16px;border-bottom:1px solid #e4ebf4;color:#7b8aa3;font-size:13px;width:150px;vertical-align:top;">${escapeHtml(k)}</td>
          <td style="padding:11px 16px;border-bottom:1px solid #e4ebf4;color:#0b1c3a;font-size:15px;font-weight:600;white-space:pre-wrap;">${escapeHtml(v)}</td>
        </tr>`,
    )
    .join('')

  const html = `
    <div style="background:#f3f7fc;padding:28px 14px;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e4ebf4;">
        <div style="background:linear-gradient(135deg,#0468d6,#1f86f0);padding:22px 24px;">
          <div style="color:#fff;font-size:19px;font-weight:800;">Новая заявка с сайта</div>
          <div style="color:#cfe2fb;font-size:14px;margin-top:3px;">Разблокировка карт и счетов · 115-ФЗ / 161-ФЗ</div>
        </div>
        <table style="width:100%;border-collapse:collapse;">${htmlRows}</table>
        <div style="padding:16px 24px;color:#7b8aa3;font-size:12px;">
          Письмо сформировано автоматически формой обратной связи на сайте.
        </div>
      </div>
    </div>`

  try {
    await transporter.sendMail({
      from: `"${config.mailFromName}" <${config.mailFrom}>`,
      to: config.mailTo,
      replyTo: config.mailFrom,
      subject: `Заявка на разблокировку — ${name}, ${phone}`,
      text: textBody,
      html,
    })
  } catch (error) {
    console.error('[contact] Ошибка отправки письма:', error)
    return {
      ok: false,
      message: 'Не удалось отправить заявку. Попробуйте позже или свяжитесь по телефону.',
    }
  }

  return { ok: true }
})
