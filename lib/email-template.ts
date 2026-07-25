import { company } from "@/lib/constants";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface EmailLayoutOptions {
  previewText: string;
  bodyHtml: string;
}

export function renderEmailLayout({ previewText, bodyHtml }: EmailLayoutOptions): string {
  return `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="margin:0;padding:0;background-color:#f4f5f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(previewText)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f5f8;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
            <tr>
              <td style="background-color:#0d1018;padding:24px 32px;">
                <img src="${company.url}/images/logo-email.png" alt="${escapeHtml(company.legalName)}" width="180" height="84" style="display:block;border:0;height:42px;width:auto;" />
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background-color:#f4f5f8;border-top:1px solid #e5e7eb;">
                <p style="margin:0;font-size:12px;color:#5b6472;line-height:1.6;">
                  ${escapeHtml(company.legalName)}<br />
                  ${escapeHtml(company.phone)} · <a href="mailto:${company.email}" style="color:#5b6472;">${company.email}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function emailButton(label: string, href: string): string {
  return `<a href="${href}" style="display:inline-block;background:#8c52ff;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 24px;border-radius:999px;">${escapeHtml(label)}</a>`;
}

export function emailDataRows(rows: { label: string; value: string }[]): string {
  const cells = rows
    .map(
      (row) => `<tr>
        <td style="padding:7px 0;font-size:13px;color:#5b6472;width:110px;vertical-align:top;white-space:nowrap;">${escapeHtml(row.label)}</td>
        <td style="padding:7px 0;font-size:14px;color:#10131a;">${escapeHtml(row.value)}</td>
      </tr>`,
    )
    .join("");

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;">${cells}</table>`;
}
