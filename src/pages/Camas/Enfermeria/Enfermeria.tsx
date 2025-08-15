import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import HospitalizacionSV from "./SinosVitalesHospitalizacion/HospitalizacionSV";
import BalanceHidrico from "./SignosVitalesBalanceHidrico/BalanceHidrico";
import Kardex from "./Kardex/Kardex";
import AsistenciaMedica from "./GestionAsistencia/AsistenciaMedica";
import CaidaMcdems from "./CaidaMcdems/CaidaMcdems";
import CaidaMorse from "./CaidaMorse/CaidaMorse";
import UlcerasPresion from "./EscalaBranden/UlcerasPresion";
import NotasEnfermeria from "./NotasEnfermeria/NotasEnfermeria";
import DrenesQuirurgicos from "./DrenesQuirurgicos/DrenesQuirurgicos";

interface OrdenesProps {
  open: boolean;
  onClose: () => void;
}

export const EnfermeriaMenu: React.FC<OrdenesProps> = ({ open, onClose }) => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Funciones para los botones de navegación
  const handlePrev = () => {
    setValue((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setValue((prev) => (prev < 5 ? prev + 1 : prev));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle
        sx={{
          backgroundColor: "#1A3C6D",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.2rem",
          py: 2,
        }}
      >
        ENFERMERIA
      </DialogTitle>
      <DialogContent
        sx={{
          background: "#F4F8FB",
          pb: 2,
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
          pt: 2,
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="ordenes examenes tabs"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTab-root": {
                fontWeight: 800,
                fontSize: { xs: "1.0rem", sm: "1.2rem" },
                color: "#1A3C6D",
                textTransform: "none",
              },
              "& .Mui-selected": {
                color: "#4A90E2",
              },
            }}
          >
            <Tab label="SV BALANCE CLINICO" />
            <Tab label="SV HOSPITALIZACION" />
            <Tab label="KARDEX" />
            <Tab label="GESTIÓN DE ASISTENCIA MÉDICA" />
            <Tab label="CAÍDA DE MCDEMS" />
            <Tab label="CAÍDA DE MORSE" />
            <Tab label="ÚLCERAS POR PRESIÓN" />
            <Tab label="NOTAS DE ENFERMERÍA" />
            <Tab label="DRENES QUIRÚRGICOS" />
          </Tabs>
        </Box>
        <Box sx={{ minHeight: "400px" }}>
          {value === 0 && <BalanceHidrico />}
          {value === 1 && <HospitalizacionSV />}
          {value === 2 && <Kardex />}
          {value === 3 && <AsistenciaMedica />}
          {value === 4 && <CaidaMcdems />}
          {value === 5 && <CaidaMorse />}
          {value === 6 && <UlcerasPresion />}
          {value === 7 && <NotasEnfermeria />}
          {value === 8 && <DrenesQuirurgicos />}
        </Box>
        {/* Botones de navegación */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button
            variant="outlined"
            onClick={handlePrev}
            disabled={value === 0}
            sx={{
              color: "#1A3C6D",
              borderColor: "#1A3C6D",
              fontWeight: "bold",
              textTransform: "none",
              px: 4,
            }}
          >
            Anterior
          </Button>
          <Button
            variant="outlined"
            onClick={handleNext}
            disabled={value === 5}
            sx={{
              color: "#1A3C6D",
              borderColor: "#1A3C6D",
              fontWeight: "bold",
              textTransform: "none",
              px: 4,
            }}
          >
            Siguiente
          </Button>
        </Box>
      </DialogContent>
      <DialogActions sx={{ background: "#F4F8FB", pb: 2, pt: 1 }}>
        <Button
          onClick={onClose}
          sx={{
            color: "#fff",
            background: "#e57373",
            borderRadius: 2,
            px: 3,
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": { background: "#c62828" },
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

