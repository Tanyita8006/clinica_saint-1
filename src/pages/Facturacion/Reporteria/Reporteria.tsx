

import React, { useState } from "react";
import {
    Box,
    Tabs,
    Tab,
    Paper,
    Card,
    CardContent,
    Typography,
} from "@mui/material";
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import ReporteFormaPago from "./ReporteFormaPago/ReporteFormaPago";
import ReporteDescuentoAhorro from "./ReporteDescuentoAhorro/ReporteDescuentoAhorro";
import ReporteGeneral from "./ReporteGeneral/ReporteGeneral";
import ReporteriaFacturacion from "./ReporteriaFacturacion/ReporteriaFacturacion";



// Importar los componentes de formularios existentes


// Interfaz para las propiedades del panel de pestañas
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

export default function Reporteria() {
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
                        <MarkunreadMailboxIcon sx={{ fontSize: 36, color: "#1A3C6D", mr: 2 }} />
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: "bold",
                                color: "#1A3C6D",
                                textAlign: "center",
                            }}
                        >
                            REPORTERIA
                        </Typography>
                    </Box>
                </CardContent>
            </Card>


            {/* Navegación por pestañas */}
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        "& .MuiTab-root": {
                            fontSize: "0.8rem",
                            fontWeight: "medium",
                            color: "#1A3C6D",
                            minHeight: "40px",
                        },
                        "& .Mui-selected": {
                            fontWeight: "bold",
                        },
                    }}
                >
                    <Tab label="REPORTE DE INGRESOS POR FORMA DE PAGO" {...a11yProps(0)} />
                    <Tab label="REPORTE GENERAL DE DESCUENTOS Y AHORRO" {...a11yProps(1)} />
                    <Tab label="REPORTE GENERAL DE ABONOS" {...a11yProps(2)} />
                    <Tab label="REPORTERIA DE FACTURACION" {...a11yProps(3)} />

                </Tabs>
            </Box>

            {/* Contenido de las pestañas */}

            <TabPanel value={tabValue} index={0}>
                <ReporteFormaPago />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <ReporteDescuentoAhorro />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
                <ReporteGeneral />
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
                <ReporteriaFacturacion />
            </TabPanel>

            {/* Botones de acción */}
           
        </Paper>
    );
}