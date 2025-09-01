import React from "react"
import { useNavigate } from "react-router-dom"

const NotFoundPage = ({ light }) => {
  const navigate = useNavigate()
  const backgroundColor = light ? '#F9FAFB' : '#121826'
  const inputBackgroundColor = light ? '#FFFFFF' : '#212936'
  const textColor = light ? '#121826' : '#FFFFFF'

  return (
    <div className="main" style={{ backgroundColor }}>
      <div
        className="main-container"
        style={{
          backgroundColor: inputBackgroundColor,
          flexDirection: "column",
          gap: "24px",
          alignItems: "center",
          justifyContent: "center",
          display: "flex"
        }}
      >
        <h1 style={{ color: textColor, fontSize: "2rem", fontWeight: "bold" }}>404</h1>
        <p style={{ color: textColor, fontSize: "1.1rem" }}>
          Página no encontrada
        </p>
        <button
          style={{
            marginTop: "12px",
            padding: "10px 24px",
            borderRadius: "8px",
            border: "none",
            background: "#3662E3",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "1rem"
          }}
          onClick={() => navigate("/")}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  )
}

export default NotFoundPage