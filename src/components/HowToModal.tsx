"use client"

import React from "react"

interface HowToModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function HowToModal({ isOpen, onClose }: HowToModalProps) {
  if (!isOpen) return null

  const steps = [
    {
      title: "Step 1: Go to ChatGPT Settings",
      description: "Click on your profile in the ChatGPT interface, then select 'Settings' from the dropdown menu.",
      image: "/images/step1-settings.png",
      alt: "ChatGPT Settings menu with Settings option highlighted"
    },
    {
      title: "Step 2: Navigate to Data Controls",
      description: "In the settings menu, find and click on 'Data controls' in the left sidebar.",
      image: "/images/step2-data-controls.png", 
      alt: "Settings page with Data controls section highlighted"
    },
    {
      title: "Step 3: Export Your Data",
      description: "Find the 'Export data' section and click the 'Export' button to request your data.",
      image: "/images/step3-export-data.png",
      alt: "Data controls page with Export data button highlighted"
    },
    {
      title: "Step 4: Confirm Export Request",
      description: "A confirmation dialog will appear. Click 'Confirm export' to proceed with the data export request.",
      image: "/images/step4-confirm-export.png",
      alt: "Confirmation dialog with Confirm export button highlighted"
    },
    {
      title: "Step 5: Download from Email",
      description: "You'll receive an email from OpenAI with a download link. Click 'Download data export' in the email.",
      image: "/images/step5-email-download.png",
      alt: "OpenAI email with Download data export button highlighted"
    },
    {
      title: "Step 6: Extract conversations.json",
      description: "Extract the downloaded ZIP file and locate the 'conversations.json' file to upload here.",
      image: "/images/step6-extract-file.png",
      alt: "File explorer showing extracted conversations.json file"
    }
  ]

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.8)",
      backdropFilter: "blur(10px)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        background: "rgba(15,23,42,0.95)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "16px",
        maxWidth: "900px",
        width: "100%",
        maxHeight: "90vh",
        overflow: "hidden",
        backdropFilter: "blur(20px)"
      }}>
        {/* Header */}
        <div style={{
          padding: "24px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <h2 style={{
            fontSize: "24px",
            fontWeight: "700",
            background: "linear-gradient(to right, #60a5fa, #a855f7)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            margin: 0
          }}>
            How to Export Your ChatGPT Data
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.7)",
              cursor: "pointer",
              fontSize: "24px",
              padding: "8px",
              borderRadius: "8px",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "white"
              e.currentTarget.style.background = "rgba(255,255,255,0.1)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.7)"
              e.currentTarget.style.background = "none"
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{
          padding: "24px",
          maxHeight: "calc(90vh - 140px)",
          overflowY: "auto"
        }}>
          <div style={{
            display: "grid",
            gap: "32px"
          }}>
            {steps.map((step, index) => (
              <div key={index} style={{
                display: "flex",
                gap: "24px",
                alignItems: "flex-start",
                flexDirection: window.innerWidth < 768 ? "column" : "row"
              }}>
                {/* Step Content */}
                <div style={{ flex: 1, minWidth: "300px" }}>
                  <h3 style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "white",
                    marginBottom: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px"
                  }}>
                    <span style={{
                      background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                      color: "white",
                      borderRadius: "50%",
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      fontWeight: "700"
                    }}>
                      {index + 1}
                    </span>
                    {step.title}
                  </h3>
                  <p style={{
                    fontSize: "15px",
                    color: "rgba(255,255,255,0.8)",
                    lineHeight: "1.6",
                    margin: 0,
                    paddingLeft: "44px"
                  }}>
                    {step.description}
                  </p>
                </div>

                {/* Step Image */}
                <div style={{
                  width: "320px",
                  height: "220px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  position: "relative"
                }}>
                  <img
                    src={step.image}
                    alt={step.alt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                    onError={(e) => {
                      // Show placeholder if image fails to load
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                      const parent = target.parentElement
                      if (parent) {
                        parent.innerHTML = `
                          <div style="
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            height: 100%;
                            color: rgba(255,255,255,0.5);
                            text-align: center;
                            padding: 20px;
                          ">
                            <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-bottom: 12px;">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                              <circle cx="8.5" cy="8.5" r="1.5"/>
                              <polyline points="21,15 16,10 5,21"/>
                            </svg>
                            <span style="fontSize: 14px; fontWeight: 500;">Screenshot ${index + 1}</span>
                            <span style="fontSize: 12px; marginTop: 4px; opacity: 0.7;">Image will be added here</span>
                          </div>
                        `
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div style={{
            marginTop: "32px",
            padding: "20px",
            background: "rgba(59,130,246,0.1)",
            borderRadius: "12px",
            border: "1px solid rgba(59,130,246,0.2)"
          }}>
            <div style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px"
            }}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20" style={{
                color: "#60a5fa",
                marginTop: "2px",
                flexShrink: 0
              }}>
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <p style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.9)",
                  margin: 0,
                  lineHeight: "1.5",
                  fontWeight: "500"
                }}>
                  <strong>Important Notes:</strong>
                </p>
                <ul style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.8)",
                  marginTop: "8px",
                  marginBottom: 0,
                  paddingLeft: "20px",
                  lineHeight: "1.5"
                }}>
                  <li>The export process may take some time depending on your data amount</li>
                  <li>You&apos;ll receive an email notification when your data is ready</li>
                  <li>The download link expires 24 hours after you receive it</li>
                  <li>Look for the <code style={{
                    background: "rgba(255,255,255,0.1)",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontSize: "13px",
                    color: "#60a5fa"
                  }}>conversations.json</code> file in the extracted ZIP</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            marginTop: "24px",
            display: "flex",
            gap: "12px",
            flexWrap: "wrap"
          }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                minWidth: "120px",
                padding: "16px 24px",
                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, #1d4ed8, #1e40af)"
                e.currentTarget.style.transform = "translateY(-1px)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, #3b82f6, #1d4ed8)"
                e.currentTarget.style.transform = "translateY(0)"
              }}
            >
              Got it!
            </button>
            <a
              href="https://chat.openai.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                minWidth: "120px",
                padding: "16px 24px",
                background: "rgba(255,255,255,0.1)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                textDecoration: "none",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.2)"
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)"
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"
              }}
            >
              Open ChatGPT
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
