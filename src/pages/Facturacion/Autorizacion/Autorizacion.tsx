import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Button,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

// Definición de interfaces
interface Paciente {
  nombre: string;
  cedula: string;
  codigo: string;
  hcu: string;
}

interface Cliente {
  nombre: string;
  cedula: string;
  montoAutorizado: string;
}

interface HistorialRow {
  id: number;
  codigo: number;
  montoAutorizado: number;
  paciente: string;
  cliente: string;
  motivoDescuento: string;
  factura: string;
  fechas: string;
}

export default function Autorizacion() {
  // Add this array of motivos
  const motivos = [
    "CONVENIO EMPRESARIAL",
    "FAMILIAR DE EMPLEADO",
    "PACIENTE RECURRENTE",
    "CASO SOCIAL",
    "OTROS",
  ];

  // Estados principales
  const [tipoAutorizacion, setTipoAutorizacion] = useState("DESCUENTO");

  // Estados de búsqueda
  const [buscarPacientePor, setBuscarPacientePor] = useState("APELLIDO");
  const [cedulaPaciente, setCedulaPaciente] = useState("");
  const [apellidoPaciente, setApellidoPaciente] = useState("");

  const [buscarClientePor, setBuscarClientePor] = useState("APELLIDO");
  const [cedulaCliente, setCedulaCliente] = useState("");
  const [apellidoCliente, setApellidoCliente] = useState("");

  // Estados de datos
  const [paciente, setPaciente] = useState<Paciente>({
    nombre: "",
    cedula: "",
    codigo: "",
    hcu: "",
  });

  const [cliente, setCliente] = useState<Cliente>({
    nombre: "",
    cedula: "",
    montoAutorizado: "",
  });

  // Estados de parámetros
  const [fechaTransaccion, setFechaTransaccion] = useState("");
  const [valorUsar, setValorUsar] = useState<number | "">("");
  const [saldoActual, setSaldoActual] = useState<number | "">("");

  // Estados de fechas
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  // Estado de justificación
  const [motivo, setMotivo] = useState("");

  // Columnas para el DataGrid
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID AUTORIZACIÓN", width: 150 },
    { field: "codigo", headerName: "CÓDIGO", width: 120 },
    { field: "montoAutorizado", headerName: "MONTO AUTORIZADO", width: 150 },
    { field: "paciente", headerName: "PACIENTE", width: 200 },
    { field: "cliente", headerName: "CLIENTE", width: 200 },
    { field: "motivoDescuento", headerName: "MOTIVO DESCUENTO", width: 200 },
    { field: "factura", headerName: "FACTURA", width: 120 },
    { field: "fechas", headerName: "FECHAS", width: 200 },
  ];

  // Datos de ejemplo para el historial
  const rows: HistorialRow[] = [
    {
      id: 1467,
      codigo: 57349,
      montoAutorizado: 367.43,
      paciente: "JUAN PÉREZ",
      cliente: "EMPRESA XYZ",
      motivoDescuento: "CREDITO OTORGADO",
      factura: "F001-001",
      fechas: "30/04/2025 - 30/05/2025",
    },
    // ... más datos
  ];

  // Función de búsqueda de paciente
  const handlePacienteSearch = () => {
    // Simulación de búsqueda
    setPaciente({
      nombre: "JUAN PÉREZ",
      cedula: "0102030405",
      codigo: "C-1234",
      hcu: "HCU-5678",
    });
  };

  // Función de búsqueda de cliente
  const handleClienteSearch = () => {
    // Simulación de búsqueda de cliente
    setCliente({
      nombre: "EMPRESA XYZ",
      cedula: "0591234567001",
      montoAutorizado: tipoAutorizacion === "CREDITO" ? "1500.00" : "",
    });
  };

  // Datos precargados para el DataGrid:
  const rows2 = [
    {
      id: 1,
      codigo: 12345,
      montoAutorizado: 500,
      paciente: "JUAN PÉREZ",
      cliente: "EMPRESA XYZ",
      motivoDescuento: "MOTIVO 1",
      factura: "F0012345",
      rangoFechas: "01/08/2025 - 31/08/2025",
    },
    {
      id: 2,
      codigo: 67890,
      montoAutorizado: 750,
      paciente: "MARÍA GÓMEZ",
      cliente: "EMPRESA ABC",
      motivoDescuento: "MOTIVO 2",
      factura: "F0012346",
      rangoFechas: "05/08/2025 - 30/08/2025",
    },
    // Puedes agregar más registros...
  ];

  const columns2 = [
    { field: "id", headerName: "ID AUTORIZACIÓN", width: 150 },
    { field: "codigo", headerName: "CÓDIGO", width: 150 },
    { field: "montoAutorizado", headerName: "MONTO AUTORIZADO", width: 180 },
    { field: "paciente", headerName: "PACIENTE", width: 180 },
    { field: "cliente", headerName: "CLIENTE", width: 180 },
    { field: "motivoDescuento", headerName: "MOTIVO DESCUENTO", width: 200 },
    { field: "factura", headerName: "FACTURA", width: 150 },
    { field: "rangoFechas", headerName: "FECHAS", width: 220 },
  ];

  // Estilos para inputs y selects (más finos)
  const textFieldProps = {
    size: "small" as const,
    fullWidth: true,
    InputProps: { style: { fontSize: 12, height: 30 } },
    InputLabelProps: { style: { fontSize: 12, fontWeight: "bold" } },
  };

  const selectProps = {
    size: "small" as const,
    fullWidth: true,
    sx: { fontSize: 12, height: 30, minHeight: 30, minWidth: 200 },
    MenuProps: { PaperProps: { style: { fontSize: 12 } } },
  };

  // Configuración de "item" para simular columnas:
  // En pantallas medianas (sm) cada item ocupará 33.33% (3 columnas por fila)
  const itemStyle = {
    flexBasis: { xs: "100%", sm: "33.33%" },
  };

  return (
    <Paper
      elevation={8}
      sx={{
        p: 3,
        border: "3px solid #4A90E2",
        borderRadius: 4,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: "#1A3C6D",
          fontWeight: "bold",
          mb: 2,
        }}
      >
        GENERACIÓN DE CÓDIGO DE CRÉDITO Y DESCUENTO
      </Typography>

      {/* Tipo de Autorización - Solo RadioGroup */}
      <RadioGroup
        row
        value={tipoAutorizacion}
        onChange={(e) => setTipoAutorizacion(e.target.value)}
        sx={{ mb: 3 }}
      >
        <FormControlLabel
          value="DESCUENTO"
          control={<Radio />}
          label="CÓDIGO DE DESCUENTO SOBRE FACTURA"
        />
        <FormControlLabel
          value="CREDITO"
          control={<Radio />}
          label="CÓDIGO DE AUTORIZACIÓN DE CRÉDITO"
        />
      </RadioGroup>

      {/* Sección Datos Generales Paciente */}
      <SectionTitle title="DATOS GENERALES PACIENTE" />
      <Box sx={{ mb: 3 }}>
        <FormControl sx={{ mb: 2 }} size="small" fullWidth>
          <InputLabel
            id="buscar-paciente-label"
            sx={{ fontWeight: "bold" }}
          >
            BUSCAR PACIENTE POR
          </InputLabel>
          <Select
            labelId="buscar-paciente-label"
            label="BUSCAR PACIENTE POR"
            value={buscarPacientePor}
            onChange={(e) => setBuscarPacientePor(e.target.value)}
            {...selectProps}
          >
            <MenuItem value="APELLIDO">APELLIDO</MenuItem>
            <MenuItem value="CEDULA">CÉDULA</MenuItem>
          </Select>
        </FormControl>
        
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            alignItems: "center",
            mb: 2,
          }}
        >
          <TextField
            label="BÚSQUEDA"
            value={buscarPacientePor === "APELLIDO" ? apellidoPaciente : cedulaPaciente}
            onChange={(e) => 
              buscarPacientePor === "APELLIDO" 
                ? setApellidoPaciente(e.target.value)
                : setCedulaPaciente(e.target.value)
            }
            {...textFieldProps}
            InputProps={{
              ...textFieldProps.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handlePacienteSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Campos auto llenados */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Box sx={itemStyle}>
            <TextField
              label="NOMBRE"
              value={paciente.nombre}
              disabled
              {...textFieldProps}
            />
          </Box>
          <Box sx={itemStyle}>
            <TextField
              label="CÉDULA"
              value={paciente.cedula}
              disabled
              {...textFieldProps}
            />
          </Box>
          <Box sx={itemStyle}>
            <TextField
              label="CÓDIGO"
              value={paciente.codigo}
              disabled
              {...textFieldProps}
            />
          </Box>
          <Box sx={itemStyle}>
            <TextField
              label="HCU"
              value={paciente.hcu}
              disabled
              {...textFieldProps}
            />
          </Box>
        </Box>
      </Box>

      {/* Datos Generales Cliente */}
      <SectionTitle title="DATOS GENERALES CLIENTE" />
      <Box sx={{ mb: 3 }}>
        <FormControl sx={{ mb: 2 }} size="small" fullWidth>
          <InputLabel
            id="buscar-cliente-label"
            sx={{ fontWeight: "bold" }}
          >
            BUSCAR CLIENTE POR
          </InputLabel>
          <Select
            labelId="buscar-cliente-label"
            label="BUSCAR CLIENTE POR"
            value={buscarClientePor}
            onChange={(e) => setBuscarClientePor(e.target.value)}
            {...selectProps}
          >
            <MenuItem value="APELLIDO">APELLIDO</MenuItem>
            <MenuItem value="CEDULA">CÉDULA</MenuItem>
          </Select>
        </FormControl>
        
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            alignItems: "center",
            mb: 2,
          }}
        >
          <TextField
            label="BÚSQUEDA"
            value={buscarClientePor === "APELLIDO" ? apellidoCliente : cedulaCliente}
            onChange={(e) => 
              buscarClientePor === "APELLIDO" 
                ? setApellidoCliente(e.target.value)
                : setCedulaCliente(e.target.value)
            }
            {...textFieldProps}
            InputProps={{
              ...textFieldProps.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClienteSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Box sx={itemStyle}>
            <TextField
              label="NOMBRE"
              value={cliente.nombre}
              disabled
              {...textFieldProps}
            />
          </Box>
          <Box sx={itemStyle}>
            <TextField
              label="CÉDULA"
              value={cliente.cedula}
              disabled
              {...textFieldProps}
            />
          </Box>
          {tipoAutorizacion === "CREDITO" && (
            <Box sx={itemStyle}>
              <TextField
                label="MONTO AUTORIZADO"
                value={cliente.montoAutorizado}
                disabled
                {...textFieldProps}
              />
            </Box>
          )}
        </Box>
      </Box>

      {/* Parámetros */}
      <SectionTitle title="PARÁMETROS" />
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Box sx={itemStyle}>
            <TextField
              label="FECHA DE TRANSACCIÓN"
              type="date"
              value={fechaTransaccion}
              onChange={(e) => setFechaTransaccion(e.target.value)}
              {...{
                ...textFieldProps,
                InputLabelProps: {
                  ...textFieldProps.InputLabelProps,
                  shrink: true,
                },
              }}
            />
          </Box>
          <Box sx={itemStyle}>
            <TextField
              label="VALOR A USAR"
              type="number"
              value={valorUsar}
              onChange={(e) => setValorUsar(Number(e.target.value) || "")}
              {...textFieldProps}
            />
          </Box>
          <Box sx={itemStyle}>
            <TextField
              label="SALDO ACTUAL"
              type="number"
              value={saldoActual}
              onChange={(e) => setSaldoActual(Number(e.target.value) || "")}
              {...textFieldProps}
            />
          </Box>
        </Box>
      </Box>

      {/* Rango de fechas */}
      <SectionTitle title="RANGO DE FECHAS (VALIDEZ DEL CÓDIGO)" />
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Box sx={itemStyle}>
            <TextField
              label="FECHA DESDE"
              type="date"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
              {...{
                ...textFieldProps,
                InputLabelProps: {
                  ...textFieldProps.InputLabelProps,
                  shrink: true,
                },
              }}
            />
          </Box>
          <Box sx={itemStyle}>
            <TextField
              label="FECHA HASTA"
              type="date"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
              {...{
                ...textFieldProps,
                InputLabelProps: {
                  ...textFieldProps.InputLabelProps,
                  shrink: true,
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Justificación */}
      <SectionTitle title="JUSTIFICACIÓN" />
      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="motivo-label" sx={{ fontWeight: "bold" }}>
            MOTIVO
          </InputLabel>
          <Select
            labelId="motivo-label"
            label="MOTIVO"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            {...selectProps}
          >
            {motivos.map((m) => (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Historial */}
      <SectionTitle title="HISTORIAL DE CRÉDITOS Y DESCUENTOS" />
      <Box sx={{ mb: 3, height: 400 }}>
        <DataGrid
          rows={rows2}
          columns={columns2}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
          autoHeight
        />
      </Box>

      {/* Botones */}
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ fontWeight: "bold", minWidth: 120 }}
        >
          GENERAR
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ fontWeight: "bold", minWidth: 120 }}
        >
          CERRAR
        </Button>
      </Box>
    </Paper>
  );
}

// COMPONENTE PARA EL TÍTULO DE SECCIÓN
interface SectionTitleProps {
  title: string;
}
const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => (
  <Box sx={{ mt: 3, mb: 1 }}>
    <Divider sx={{ mb: 1, borderColor: "#B6D7ED", borderWidth: 2 }} />
    <Typography
      variant="h6"
      sx={{
        fontWeight: "bold",
        color: "#1A3C6D",
        fontSize: { xs: "0.9rem", sm: "1rem" },
      }}
    >
      {title}
    </Typography>
  </Box>
);