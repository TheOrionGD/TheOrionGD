import nodemailer from 'nodemailer';

/**
 * Lead Notification Email Service using Brevo SMTP Relay.
 * Dispatches an executive intelligence dossier whenever a lead is detected in chat.
 */
export async function sendLeadNotificationEmail({
  sessionId = 'N/A',
  visitorLabel = 'Visitor',
  summary = 'Lead detected',
  matchedKeywords = [],
  extractedContact = {},
  recentMessages = []
} = {}) {
  const host = process.env.SMTP_SERVER || 'smtp-relay.brevo.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_LOGIN;
  const pass = process.env.BREVO_SMTP_KEY;

  if (!user || !pass) {
    console.warn('[Email Service] SMTP credentials (SMTP_LOGIN or BREVO_SMTP_KEY) missing in .env. Notification skipped.');
    return { success: false, reason: 'Missing SMTP credentials' };
  }

  const recipientEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'godfreytr.prof@gmail.com';
  const senderEmail = process.env.SENDER_EMAIL || 'godfreytr.prof@gmail.com';
  const senderName = 'TheOrionGD Intelligence';

  const interestText = matchedKeywords.length > 0 ? matchedKeywords.join(', ') : 'Direct Inquiry / Collaboration';
  const subject = `🎯 [LEAD SIGNAL] ${interestText.toUpperCase()} — ${visitorLabel}`;

  const contactName = extractedContact.name || 'Not provided';
  const contactEmail = extractedContact.email || 'Not provided';
  const contactPhone = extractedContact.phone || 'Not provided';
  const contactNote = extractedContact.note || 'Visitor interacting in chat';

  const appUrl = (process.env.APP_URL || process.env.PUBLIC_APP_URL || 'https://the-orion-gd.vercel.app').replace(/\/+$/, '');
  const adminDashboardUrl = `${appUrl}/admin/dashboard`;

  const hasDirectEmail = contactEmail && contactEmail !== 'Not provided';
  const hasDirectPhone = contactPhone && contactPhone !== 'Not provided';

  // Keyword badges HTML
  const keywordBadgesHtml = (matchedKeywords.length > 0 ? matchedKeywords : ['General Lead'])
    .map(kw => `
      <span style="display: inline-block; padding: 4px 10px; margin: 2px 4px 2px 0; background: #EEF2F6; color: #1E293B; border: 1px solid #CBD5E1; border-radius: 4px; font-size: 11px; font-family: 'Courier New', monospace; font-weight: bold; text-transform: uppercase;">
        #${kw}
      </span>
    `).join('');

  // Conversation history HTML
  const conversationHtml = (recentMessages || []).map((m, idx) => {
    const isUser = m.role === 'user';
    const bubbleBg = isUser ? '#F0F7FF' : '#F8FAFC';
    const borderColor = isUser ? '#2563EB' : '#94A3B8';
    const roleBadgeBg = isUser ? '#DBEAFE' : '#E2E8F0';
    const roleBadgeColor = isUser ? '#1E40AF' : '#475569';
    const roleLabel = isUser ? 'VISITOR' : 'ORION AI AGENT';

    return `
      <div style="margin-bottom: 12px; background: ${bubbleBg}; border-left: 4px solid ${borderColor}; border-radius: 6px; padding: 12px 14px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="font-size: 10px; font-weight: 800; font-family: 'Courier New', monospace; letter-spacing: 0.08em; color: ${roleBadgeColor};">
              <span style="display: inline-block; padding: 2px 6px; background: ${roleBadgeBg}; border-radius: 3px;">${roleLabel}</span>
            </td>
            <td style="text-align: right; font-size: 10px; color: #94A3B8; font-family: monospace;">
              MSG #${idx + 1}
            </td>
          </tr>
        </table>
        <div style="margin-top: 6px; font-size: 13px; color: #1E293B; line-height: 1.55; white-space: pre-wrap; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          ${m.content || ''}
        </div>
      </div>
    `;
  }).join('');

  const nowFormatted = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0E131F; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  
  <!-- Outer Wrapper Table -->
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0E131F; padding: 28px 12px;">
    <tr>
      <td align="center">
        
        <!-- Main Email Container (Max 640px) -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 640px; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.4); border: 1px solid #1E293B;">
          
          <!-- TOP SYSTEM CLASSIFICATION BAR -->
          <tr>
            <td style="background-color: #0A0D14; padding: 12px 24px; border-bottom: 1px solid #1E293B;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="font-family: 'Courier New', monospace; font-size: 10px; font-weight: 700; color: #38BDF8; letter-spacing: 0.12em; text-transform: uppercase;">
                    SYSTEM OF RECORD // THEORIONGD
                  </td>
                  <td align="right">
                    <span style="display: inline-block; padding: 3px 8px; background-color: #DC2626; color: #FFFFFF; font-size: 9px; font-family: 'Courier New', monospace; font-weight: 800; letter-spacing: 0.1em; border-radius: 3px; text-transform: uppercase;">
                      HIGH PRIORITY
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- HERO HEADER SECTION -->
          <tr>
            <td style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); padding: 32px 28px; border-bottom: 3px solid #2563EB;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="font-family: 'Courier New', monospace; font-size: 11px; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 6px;">
                      RADAR DETECTOR // REAL-TIME INGEST
                    </div>
                    <h1 style="margin: 0; color: #FFFFFF; font-size: 24px; font-weight: 800; letter-spacing: -0.02em; line-height: 1.2;">
                      🎯 Potential Client Lead Captured
                    </h1>
                    <div style="margin-top: 10px; font-size: 13px; color: #CBD5E1; line-height: 1.4;">
                      A visitor interacting with the portfolio chatbot has triggered positive interest signals.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- DETECTION SUMMARY BANNER -->
          <tr>
            <td style="padding: 24px 28px 12px 28px;">
              <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-left: 4px solid #10B981; border-radius: 8px; padding: 14px 18px;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td>
                      <div style="font-size: 10px; font-family: 'Courier New', monospace; font-weight: 700; color: #059669; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px;">
                        INTENT CLASSIFICATION
                      </div>
                      <div style="font-size: 15px; font-weight: 700; color: #0F172A;">
                        ${summary}
                      </div>
                      <div style="margin-top: 8px;">
                        ${keywordBadgesHtml}
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- SECTION 01: CAPTURED CONTACT DETAILS DOSSIER -->
          <tr>
            <td style="padding: 12px 28px;">
              <div style="border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden;">
                
                <!-- Section Header -->
                <div style="background-color: #0F172A; padding: 10px 16px;">
                  <span style="font-size: 11px; font-family: 'Courier New', monospace; font-weight: 800; color: #F8FAFC; text-transform: uppercase; letter-spacing: 0.08em;">
                    SECTION 01 // CAPTURED CONTACT DOSSIER
                  </span>
                </div>

                <!-- Section Table -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding: 16px; font-size: 13px;">
                  <tr style="border-bottom: 1px solid #F1F5F9;">
                    <td style="padding: 8px 0; color: #64748B; width: 130px; font-weight: 600;">Operator Label:</td>
                    <td style="padding: 8px 0; color: #0F172A; font-weight: 700; font-family: monospace;">${visitorLabel}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #F1F5F9;">
                    <td style="padding: 8px 0; color: #64748B; font-weight: 600;">Contact Name:</td>
                    <td style="padding: 8px 0; color: #0F172A; font-weight: 600;">${contactName}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #F1F5F9;">
                    <td style="padding: 8px 0; color: #64748B; font-weight: 600;">Email Address:</td>
                    <td style="padding: 8px 0; color: #2563EB; font-weight: 700;">
                      ${hasDirectEmail ? `<a href="mailto:${contactEmail}" style="color: #2563EB; text-decoration: underline;">${contactEmail}</a>` : `<span style="color: #94A3B8; font-style: italic;">Not provided</span>`}
                    </td>
                  </tr>
                  <tr style="border-bottom: 1px solid #F1F5F9;">
                    <td style="padding: 8px 0; color: #64748B; font-weight: 600;">Phone Number:</td>
                    <td style="padding: 8px 0; color: #0F172A;">
                      ${hasDirectPhone ? `<a href="tel:${contactPhone}" style="color: #0F172A; text-decoration: underline;">${contactPhone}</a>` : `<span style="color: #94A3B8; font-style: italic;">Not provided</span>`}
                    </td>
                  </tr>
                  <tr style="border-bottom: 1px solid #F1F5F9;">
                    <td style="padding: 8px 0; color: #64748B; font-weight: 600;">Interest Target:</td>
                    <td style="padding: 8px 0; color: #0284C7; font-weight: 700;">${interestText}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748B; font-weight: 600;">Captured Note:</td>
                    <td style="padding: 8px 0; color: #475569; font-style: italic;">${contactNote}</td>
                  </tr>
                </table>

              </div>
            </td>
          </tr>

          <!-- SECTION 02: QUICK ACTION BUTTONS -->
          <tr>
            <td style="padding: 12px 28px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  ${hasDirectEmail ? `
                  <td style="padding-right: 8px;">
                    <a href="mailto:${contactEmail}?subject=Re:%20Collaboration%20Inquiry%20via%20TheOrionGD&body=Hi%20there,%0A%0AThank%20you%20for%20reaching%20out%20via%20my%20portfolio.%20I%20saw%20your%20interest%20in%20${encodeURIComponent(interestText)}%20and%20would%20love%20to%20connect.%0A%0ABest,%0AGodfrey%20T%20R" 
                       style="display: block; background-color: #2563EB; color: #FFFFFF; text-align: center; padding: 12px 16px; border-radius: 6px; font-size: 12px; font-weight: 700; font-family: 'Courier New', monospace; text-transform: uppercase; text-decoration: none; letter-spacing: 0.05em;">
                      ✉️ Reply Directly
                    </a>
                  </td>
                  ` : ''}
                  <td>
                    <a href="${adminDashboardUrl}" 
                       style="display: block; background-color: #0F172A; color: #FFFFFF; text-align: center; padding: 12px 16px; border-radius: 6px; font-size: 12px; font-weight: 700; font-family: 'Courier New', monospace; text-transform: uppercase; text-decoration: none; letter-spacing: 0.05em; border: 1px solid #334155;">
                      ⚡ Open Admin Dashboard
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SECTION 03: CONVERSATION TRANSCRIPT & SIGNALS -->
          <tr>
            <td style="padding: 12px 28px;">
              <div style="border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #1E293B; padding: 10px 16px;">
                  <span style="font-size: 11px; font-family: 'Courier New', monospace; font-weight: 800; color: #F8FAFC; text-transform: uppercase; letter-spacing: 0.08em;">
                    SECTION 02 // CHAT TRANSCRIPT & TELEMETRY
                  </span>
                </div>
                <div style="padding: 16px;">
                  ${recentMessages.length > 0 ? conversationHtml : '<p style="color: #94A3B8; font-size: 12px; margin: 0;">No prior messages recorded.</p>'}
                </div>
              </div>
            </td>
          </tr>

          <!-- SECTION 04: RECOMMENDED PROTOCOL / PLAYBOOK -->
          <tr>
            <td style="padding: 12px 28px;">
              <div style="background-color: #F8FAFC; border: 1px dashed #CBD5E1; border-radius: 8px; padding: 14px 18px;">
                <div style="font-size: 10px; font-family: 'Courier New', monospace; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;">
                  SECTION 03 // RECOMMENDED ENGAGEMENT PROTOCOL
                </div>
                <ul style="margin: 0; padding-left: 18px; font-size: 12px; color: #334155; line-height: 1.6;">
                  <li><strong>Assess Opportunity Alignment:</strong> Cross-check client request with core strengths (Full Stack, AI Systems, Spatial XR).</li>
                  <li><strong>Review Lead State:</strong> Check conversation thread in your <a href="${adminDashboardUrl}" style="color: #2563EB;">Admin Conversations Inbox</a>.</li>
                  <li><strong>Direct Follow-up:</strong> If contact info is absent, monitor chat session for follow-up inputs or contact submission.</li>
                </ul>
              </div>
            </td>
          </tr>

          <!-- SECTION 05: SYSTEM METADATA & TELEMETRY -->
          <tr>
            <td style="padding: 12px 28px 24px 28px;">
              <div style="background-color: #F1F5F9; border-radius: 6px; padding: 10px 14px; font-family: 'Courier New', monospace; font-size: 11px; color: #64748B;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td><strong>Session ID:</strong> ${sessionId}</td>
                    <td align="right"><strong>Time:</strong> ${nowFormatted}</td>
                  </tr>
                  <tr>
                    <td><strong>Channel:</strong> Web Chatbot Interface</td>
                    <td align="right"><strong>Dispatch Relay:</strong> Brevo SMTP (587)</td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color: #0A0D14; padding: 24px 28px; text-align: center; border-top: 1px solid #1E293B;">
              <p style="margin: 0 0 6px 0; color: #FFFFFF; font-size: 13px; font-weight: 700; letter-spacing: 0.05em;">
                GODFREY T R // THEORIONGD
              </p>
              <p style="margin: 0 0 10px 0; color: #64748B; font-size: 11px;">
                AI Systems Architect & Full-Stack Product Engineer
              </p>
              <p style="margin: 0; color: #475569; font-size: 10px; font-family: monospace;">
                CONFIDENTIAL & PROPRIETARY // AUTOMATED INTELLIGENCE SYSTEM
              </p>
            </td>
          </tr>

        </table>
        
      </td>
    </tr>
  </table>

</body>
</html>
  `;

  const textContent = `
[THEORIONGD // LEAD INTELLIGENCE DOSSIER]
==================================================
SUMMARY: ${summary}
INTERESTED IN: ${interestText}
VISITOR LABEL: ${visitorLabel}
SESSION ID: ${sessionId}
TIMESTAMP: ${nowFormatted}

CAPTURED CONTACT DETAILS:
- Name: ${contactName}
- Email: ${contactEmail}
- Phone: ${contactPhone}
- Note: ${contactNote}

RECENT CONVERSATION:
${(recentMessages || []).map(m => `[${m.role.toUpperCase()}]: ${m.content}`).join('\n\n')}
==================================================
Check Admin Dashboard: ${adminDashboardUrl}
  `.trim();

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    const info = await transporter.sendMail({
      from: `"${senderName}" <${senderEmail}>`,
      to: recipientEmail,
      subject,
      text: textContent,
      html: htmlContent,
    });

    console.log(`[Email Service] Lead notification successfully sent to ${recipientEmail} (messageId: ${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error('[Email Service] Failed to send email via SMTP:', err);
    return { success: false, error: err.message };
  }
}
