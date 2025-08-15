
import React, { useState } from "react";
import {
    Box,
    Tabs,
    Tab,
    Paper,
} from "@mui/material";
import Cheque from "./TiposPago/Cheque";
import Tarjeta from "./TiposPago/Tarjeta";
import Transferencia from "./TiposPago/Transferencia";



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

export default function TipoPagosMenus() {
    // Estado para controlar la pestaña activa
    const [tabValue, setTabValue] = useState(0);

    // Función para cambiar de pestaña
    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Paper elevation={1} sx={{ p: 1, m: 1 }}>
            {/* Encabezado */}


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
                    <Tab label="TRANSFERENCIA" {...a11yProps(2)} />

                </Tabs>
            </Box>

            {/* Contenido de las pestañas */}

            <TabPanel value={tabValue} index={0}>
                <Tarjeta />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <Cheque />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
                <Transferencia />
            </TabPanel>
              
            {/* Botones de acción */}
           
        </Paper>
    );
}