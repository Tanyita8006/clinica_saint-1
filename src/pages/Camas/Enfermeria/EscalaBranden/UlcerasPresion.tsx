
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
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

import {
    AccountBalance as AccountBalanceIcon,
    Save as SaveIcon,
    Print as PrintIcon,
} from "@mui/icons-material";
import DatosPaciente from "../Kardex/DatosPaciente";
import RiesgoUlceras from "./RiesgoUlceras";


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

export default function UlcerasPresion() {
    // Estado para controlar la pestaña activa
    const [tabValue, setTabValue] = useState(0);

    // Función para cambiar de pestaña
    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Paper elevation={1} sx={{ p: 1, m: 1 }}>
            {/* ENCABEZADO */}
            <Card sx={{ mb: 1, boxShadow: 1 }}>
                <CardContent sx={{ p: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "left" }}>
                        <PriorityHighIcon sx={{ fontSize: 36, color: "#1A3C6D", mr: 2 }} />
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: "bold",
                                color: "#1A3C6D",
                                textAlign: "center",
                                letterSpacing: 1,
                            }}
                        >
                            RIESGO DE ÚLCERAS POR PRESIÓN
                        </Typography>
                    </Box>
                </CardContent>
            </Card>

            {/* CONTENIDO DE LAS PESTAÑAS */}
            <TabPanel value={tabValue} index={0}>
                <DatosPaciente />
            </TabPanel>
            <TabPanel value={tabValue} index={0}>
                <RiesgoUlceras />
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
                        fontSize: "0.8rem",
                        letterSpacing: 1,
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
                        fontSize: "0.8rem",
                        letterSpacing: 1,
                    }}
                >
                    CERRAR
                </Button>
            </Box>
        </Paper>
    );
}