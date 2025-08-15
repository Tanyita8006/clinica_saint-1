import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Avatar } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';

import PersonIcon from "@mui/icons-material/Person";

interface Nota {
  fecha: string;
  hora: string;
  nota: string;
  usuario: string;
}

function getColorByHora(hora: string) {
  const [h, m] = hora.split(":").map(Number);
  const minutos = h * 60 + m;
  if (minutos >= 420 && minutos <= 1139) {
    return "#2356A8"; // Azul
  }
  return "#D32F2F"; // Rojo
}

function getFechaActual() {
  const hoy = new Date();
  const yyyy = hoy.getFullYear();
  const mm = String(hoy.getMonth() + 1).padStart(2, "0");
  const dd = String(hoy.getDate()).padStart(2, "0");
  return `${dd}/${mm}/${yyyy}`;
}

function getHoraActual() {
  const hoy = new Date();
  const hh = String(hoy.getHours()).padStart(2, "0");
  const min = String(hoy.getMinutes()).padStart(2, "0");
  return `${hh}:${min}`;
}

export default function Notas() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [nota, setNota] = useState("");
  const usuario = "LCDO/A (logeado)";

  const handleAgregar = () => {
    if (nota.trim()) {
      const fecha = getFechaActual();
      const hora = getHoraActual();
      setNotas([
        ...notas,
        { fecha, hora, nota, usuario }
      ]);
      setNota("");
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1A3C6D", mb: 2 }}>
           <DescriptionIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        NOTAS DE ENFERMERÍA
      </Typography>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box sx={{ flex: 1, width: "100%" }}>
            <TextField
              label="Nota de enfermería"
              size="small"
              value={nota}
              onChange={e => setNota(e.target.value)}
              fullWidth
              multiline
              minRows={2}
              sx={{ background: "#F4F8FB" }}
            />
          </Box>
          <Box sx={{ width: { xs: "100%", sm: 120 } }}>
            <Button
              variant="contained"
              onClick={handleAgregar}
              sx={{ background: "#1A3C6D", fontWeight: "bold", width: "100%", height: "100%" }}
            >
              AGREGAR
            </Button>
          </Box>
        </Box>
      </Paper>
      <Box>
        {notas.length === 0 && (
          <Typography sx={{ color: "#888", textAlign: "center", mt: 4 }}>
            No hay notas registradas.
          </Typography>
        )}
        {notas.map((n, idx) => {
          const color = getColorByHora(n.hora);
          return (
            <Paper
              key={idx}
              sx={{
                mb: 2,
                p: 2,
                borderLeft: `6px solid ${color}`,
                background: "#F9FAFC",
                boxShadow: "0 2px 8px #0001"
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-start", sm: "center" },
                  gap: 1,
                }}
              >
                <Box sx={{ minWidth: 90, mb: { xs: 1, sm: 0 } }}>
                  <Typography sx={{ color, fontWeight: 700, fontSize: 15 }}>
                    {n.fecha}
                  </Typography>
                  <Typography sx={{ color, fontWeight: 700, fontSize: 15 }}>
                    {n.hora}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, mb: { xs: 1, sm: 0 } }}>
                  <Box
                    sx={{
                      background: "#fff",
                      borderRadius: 1,
                      p: 1.2,
                      maxHeight: 120,
                      overflowY: "auto",
                      wordBreak: "break-word",
                      whiteSpace: "pre-wrap",
                      boxShadow: "0 1px 4px #0001",
                    }}
                  >
                    <Typography
                      sx={{
                        color,
                        fontWeight: 700,
                        fontSize: 15,
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                        lineHeight: 1.5,
                      }}
                    >
                      {n.nota}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ minWidth: 120, display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar sx={{ bgcolor: color, width: 28, height: 28 }}>
                    <PersonIcon sx={{ color: "#fff", fontSize: 20 }} />
                  </Avatar>
                  <Typography sx={{ color, fontWeight: 700, fontSize: 14 }}>
                    {n.usuario}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
}