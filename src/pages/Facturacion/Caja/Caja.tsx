import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import {
  PointOfSale as PointOfSaleIcon,
} from "@mui/icons-material";
import EncabezadoComprobante from "./EncabezadoCommprobante/EncabezadoComprobante";
import FormasPagoMenu from "./FormasPago/FormasPagoMenu";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Componente para el panel de cada pestaña
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`protocolo-tab-panel-${index}`}
      aria-labelledby={`protocolo-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

// Propiedades de accesibilidad para las pestañas
function a11yProps(index: number) {
  return {
    id: `protocolo-tab-${index}`,
    "aria-controls": `protocolo-tab-panel-${index}`,
  };
}

export default function Caja() {
  // Estado para controlar la pestaña activa
  const [tabValue, setTabValue] = useState(0);

  // Función para cambiar de pestaña
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Paper elevation={1} sx={{ p: 1, m: 1 }}>
      {/* Encabezado */}
        <Card sx={{ mb: 1, boxShadow: 1 }}>
          <CardContent sx={{ p: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "left" }}>
              <PointOfSaleIcon  sx={{ fontSize: 36, color: "#1A3C6D", mr: 2 }} />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "#1A3C6D",
                  textAlign: "center",
                }}
              >
                CAJA (FACTURACIÓN)
              </Typography>
            </Box>
          </CardContent>
        </Card>


      {/* Contenido de las pestañas */}
      <TabPanel value={tabValue} index={0}>
        <EncabezadoComprobante />
      </TabPanel>

      <TabPanel value={tabValue} index={0}>
        <FormasPagoMenu />
      </TabPanel>
    </Paper>
  );
}
