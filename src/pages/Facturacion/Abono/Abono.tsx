import React, { useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Card,
    CardContent,
    Button,
    Divider,
} from "@mui/material";
import SavingsIcon from '@mui/icons-material/Savings';
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ReplayIcon from "@mui/icons-material/Replay";
import CancelIcon from "@mui/icons-material/Cancel";

import {
    AccountBalance as AccountBalanceIcon,
    Save as SaveIcon,
    Print as PrintIcon,

} from "@mui/icons-material";

import TipoPagoForm from "../Anticipos/TipoPagoForm";
import DatosGenerales from "../Anticipos/DatosGenerales";
import TipoPagoList from "./TipoPagoList/TipoPagoList";


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

export default function Abono() {
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
                        <SavingsIcon sx={{ fontSize: 36, color: "#1A3C6D", mr: 2 }} />
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: "bold",
                                color: "#1A3C6D",
                                textAlign: "center",
                            }}
                        >
                            ABONOS
                        </Typography>
                    </Box>
                </CardContent>
            </Card>

            {/* Contenido de las pestañas */}
            <TabPanel value={tabValue} index={0}>
                <DatosGenerales />
            </TabPanel>
            <TabPanel value={tabValue} index={0}>
                <TipoPagoList />
            </TabPanel>
           
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
                    GRABAR
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
                    IMPRIMIR
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<FileDownloadIcon />}
                    size="small"
                    sx={{
                        color: "#1A3C6D",
                        borderColor: "#1A3C6D",
                        fontSize: "0.8rem"
                    }}
                >
                    EXPORTAR
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<ReplayIcon />}
                    size="small"
                    sx={{
                        color: "#1A3C6D",
                        borderColor: "#1A3C6D",
                        fontSize: "0.8rem"
                    }}
                >
                    REIMPRIMIR
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    size="small"
                    sx={{
                        color: "#D32F2F",
                        borderColor: "#D32F2F",
                        fontSize: "0.8rem"
                    }}
                >
                    ANULAR
                </Button>
            </Box>
        </Paper>
    );
}
