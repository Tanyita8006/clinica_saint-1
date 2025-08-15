
import React, { useState } from "react";
import {
    Box,
    Tabs,
    Tab,
    Typography,
    Paper,
    Button,
    Divider,
    Card,
    CardContent,
} from "@mui/material";
import {
    Save as SaveIcon,
    Print as PrintIcon,
    Assignment as FormIcon,
} from "@mui/icons-material";
import PagoCheque from "./PagoCheque";
import Credito from "./Credito";
import PagoTarjeta from "./PagoTarjeta";
import Descuento from "./Descuento";
import Anticipo from "./Anticipo";
import Transferencia from "./Transferencia";
import NuevoCliente from "./NuevoCliente";
import Referidos from "./Referidos";


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

export default function FormasPagoMenu() {
    // Estado para controlar la pestaña activa
    const [tabValue, setTabValue] = useState(0);

    // Función para cambiar de pestaña
    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Paper elevation={1} sx={{ p: 1, m: 1 }}>
            {/* Encabezado */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "left" }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: "bold",
                        color: "#1A3C6D",
                        textAlign: "center",
                    }}
                >
                    FORMAS DE PAGO              
                    </Typography>
            </Box>

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
                    <Tab label="PAGO POR TARJETA" {...a11yProps(0)} />
                    <Tab label="PAGO CON CHEQUE" {...a11yProps(1)} />
                    <Tab label="CRÉDITO" {...a11yProps(2)} />
                    <Tab label="DESCUENTO" {...a11yProps(3)} />
                    <Tab label="ANTICIPO" {...a11yProps(4)} />
                    <Tab label="TRANSFERENCIA" {...a11yProps(5)} />
                    <Tab label="NUEVO CLIENTE" {...a11yProps(6)} />
                    <Tab label="REFERIDOS" {...a11yProps(7)} />
                </Tabs>
            </Box>

            {/* Contenido de las pestañas */}
            <TabPanel value={tabValue} index={0}>
                <PagoTarjeta />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
                <PagoCheque />
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
                <Credito />
            </TabPanel>
           
            <TabPanel value={tabValue} index={3}>
                <Descuento />
            </TabPanel>

            <TabPanel value={tabValue} index={4}>
                    <Anticipo />
            </TabPanel>

            <TabPanel value={tabValue} index={5}>
                <Transferencia />
            </TabPanel>

            <TabPanel value={tabValue} index={6}>
                <NuevoCliente />
            </TabPanel>
            <TabPanel value={tabValue} index={7}>
                <Referidos />
            </TabPanel>

            {/* Botones de acción */}
            <Divider sx={{ mt: 4, mb: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "center", gap: 1.5, flexWrap: "wrap" }}>
                <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    size="small"
                    sx={{
                        background: "#1A3C6D",
                        "&:hover": { background: "#274472" },
                        fontSize: "0.8rem"
                    }}
                >
                    REGISTRAR
                </Button>

                <Button
                    variant="outlined"
                    startIcon={<PrintIcon />}
                    size="small"
                    sx={{
                        color: "#1A3C6D",
                        borderColor: "#1A3C6D",
                        fontSize: "0.8rem"
                    }}
                >
                    CERRAR
                </Button>
            </Box>
        </Paper>
    );
}