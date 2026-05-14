import React from "react";
import { Avatar } from "antd";

const CardUI = (props) => {
  return (
    <div style={{
      width: props.width || "100%",
      background: "#fff",
      border: "1px solid rgba(0,0,0,0.1)",
      borderRadius: "12px",
      padding: "clamp(12px, 3vw, 24px)",
      boxSizing: "border-box",
    }}>

      {/* ── Profile Header ── */}
      {props.image && (
        <div style={{
          display: "flex", flexDirection: "row",
          alignItems: "center", gap: "14px", flexWrap: "wrap",
        }}>
          {/* Avatar */}
          <Avatar
            size={props.imgSize || 64}
            src={`https://office-utility-webapp-v3-backend.vercel.app/${props.image}`}
            style={{
              flexShrink: 0,
              border: "2px solid #E6F1FB",
            }}
          />

          {/* Name / Position / Address */}
          {props.title && (
            <div style={{ minWidth: 0, flex: 1 }}>
              <p style={{
                margin: 0, fontSize: "16px", fontWeight: "500",
                color: "#111", wordBreak: "break-word",
              }}>
                {props.title}
              </p>

              {props.position && (
                <p style={{
                  margin: "3px 0 0", fontSize: "13px",
                  fontWeight: "500", color: "#185FA5",
                }}>
                  {props.position}
                </p>
              )}

              {props.address && (
                <p style={{
                  margin: "3px 0 0", fontSize: "13px",
                  fontWeight: "400", color: "#888", wordBreak: "break-word",
                }}>
                  {props.address}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Divider (only when header is present) ── */}
      {props.image && props.children && (
        <div style={{ height: "1px", background: "rgba(0,0,0,0.07)", margin: "16px 0" }} />
      )}

      {/* ── Body ── */}
      {props.children && (
        <div>{props.children}</div>
      )}

    </div>
  );
};

export default CardUI;