import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface PacienteData {
  cedula: string;
  nombre: string;
}

interface ClienteData {
  cedulaRuc: string;
  nombre: string;
}

export default function EncabezadoComprobante() {
  // Estados para los datos del paciente
  const [paciente, setPaciente] = useState<PacienteData>({
    cedula: '',
    nombre: '',
  });

  // Estados para los datos del cliente
  const [cliente, setCliente] = useState<ClienteData>({
    cedulaRuc: '',
    nombre: '',
  });

  // Estados para los campos de búsqueda
  const [cedulaBusqueda, setCedulaBusqueda] = useState('');
  const [cedulaRucBusqueda, setCedulaRucBusqueda] = useState('');

  // Estilos comunes para los campos
  const textFieldProps = {
    size: 'small' as const,
    fullWidth: true,
    InputProps: { style: { fontSize: 12, height: 35 } },
    InputLabelProps: { style: { fontSize: 12, fontWeight: 'bold' } },
  };

  // Configuración de "item" para simular columnas
  const itemStyle = {
    flexBasis: { xs: "100%", sm: "48%" },
    minWidth: "200px",
  };

  // Función para buscar paciente (simulada con datos precargados)
  const handlePacienteSearch = () => {
    // Datos precargados de ejemplo
    const pacientesData = [
      { cedula: '0102030405', nombre: 'JUAN CARLOS PÉREZ GÓMEZ' },
      { cedula: '0987654321', nombre: 'MARÍA ELENA RODRÍGUEZ LÓPEZ' },
      { cedula: '1234567890', nombre: 'CARLOS ALBERTO MENDOZA SILVA' },
    ];

    // Buscar por cédula ingresada o usar el primer registro como ejemplo
    const pacienteEncontrado = pacientesData.find(p => p.cedula === cedulaBusqueda) || pacientesData[0];
    
    setPaciente({
      cedula: pacienteEncontrado.cedula,
      nombre: pacienteEncontrado.nombre,
    });
  };

  // Función para buscar cliente (simulada con datos precargados)
  const handleClienteSearch = () => {
    // Datos precargados de ejemplo
    const clientesData = [
      { cedulaRuc: '0591234567001', nombre: 'EMPRESA MEDICAL XYZ S.A.' },
      { cedulaRuc: '0591987654001', nombre: 'CORPORACIÓN SALUD ABC CIA. LTDA.' },
      { cedulaRuc: '1234567890', nombre: 'PÉREZ GONZÁLEZ LUIS FERNANDO' },
    ];

    // Buscar por cédula/RUC ingresada o usar el primer registro como ejemplo
    const clienteEncontrado = clientesData.find(c => c.cedulaRuc === cedulaRucBusqueda) || clientesData[0];
    
    setCliente({
      cedulaRuc: clienteEncontrado.cedulaRuc,
      nombre: clienteEncontrado.nombre,
    });
  };

  return (
    <Box sx={{ p: 2, border: '2px solid #E0E0E0', borderRadius: 2, mb: 3 }}>
      <Typography 
        variant="h6" 
        sx={{ 
          color: '#1A3C6D', 
          fontWeight: 'bold', 
          mb: 2,
          fontSize: '1rem'
        }}
      >
        ENCABEZADO DEL COMPROBANTE
      </Typography>

      {/* Campos de búsqueda */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
        <Box sx={itemStyle}>
          <TextField
            label="CÉDULA (PACIENTE)"
            value={cedulaBusqueda}
            onChange={(e) => setCedulaBusqueda(e.target.value)}
            placeholder="Ingrese cédula del paciente"
            {...textFieldProps}
            InputProps={{
              ...textFieldProps.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={handlePacienteSearch}
                    size="small"
                  >
                    <SearchIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={itemStyle}>
          <TextField
            label="CÉDULA/RUC (CLIENTE)"
            value={cedulaRucBusqueda}
            onChange={(e) => setCedulaRucBusqueda(e.target.value)}
            placeholder="Ingrese cédula/RUC del cliente"
            {...textFieldProps}
            InputProps={{
              ...textFieldProps.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={handleClienteSearch}
                    size="small"
                  >
                    <SearchIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      {/* Campos de información auto-llenados */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Box sx={itemStyle}>
          <TextField
            label="CLIENTE"
            value={cliente.nombre}
            disabled
            helperText="A qué nombre saldrá la factura"
            {...textFieldProps}
          />
        </Box>
        <Box sx={itemStyle}>
          <TextField
            label="PACIENTE"
            value={paciente.nombre}
            disabled
            helperText="Nombre del paciente"
            {...textFieldProps}
          />
        </Box>
      </Box>

      {/* Información adicional si hay datos cargados */}
      {(paciente.nombre || cliente.nombre) && (
        <Box sx={{ mt: 2, p: 1, backgroundColor: '#F5F5F5', borderRadius: 1 }}>
          <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#666' }}>
            INFORMACIÓN CARGADA:
          </Typography>
          {paciente.nombre && (
            <Typography variant="caption" sx={{ display: 'block', color: '#333' }}>
              • Paciente: {paciente.nombre} (C.I.: {paciente.cedula})
            </Typography>
          )}
          {cliente.nombre && (
            <Typography variant="caption" sx={{ display: 'block', color: '#333' }}>
              • Cliente: {cliente.nombre} (RUC/C.I.: {cliente.cedulaRuc})
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}