import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Alert,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

interface ClienteData {
  tipoIdentificacion: 'CEDULA' | 'RUC';
  numeroDocumento: string;
  tipoPersona: 'NATURAL' | 'JURIDICA'; // Solo para RUC
  apellidoPaterno: string;
  apellidoMaterno: string;
  primerNombre: string;
  segundoNombre: string;
  razonSocial: string; // Solo para persona jurídica
  telefono: string;
  direccion: string;
  correoElectronico: string;
  sexo: string;
  estadoCivil: string;
}

export default function NuevoCliente() {
  const [clienteData, setClienteData] = useState<ClienteData>({
    tipoIdentificacion: 'CEDULA',
    numeroDocumento: '',
    tipoPersona: 'NATURAL',
    apellidoPaterno: '',
    apellidoMaterno: '',
    primerNombre: '',
    segundoNombre: '',
    razonSocial: '',
    telefono: '',
    direccion: '',
    correoElectronico: '',
    sexo: 'MASCULINO',
    estadoCivil: 'SOLTERO',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Opciones para los selects
  const opcionesSexo = ['MASCULINO', 'FEMENINO'];
  const opcionesEstadoCivil = ['SOLTERO', 'CASADO', 'DIVORCIADO', 'VIUDO', 'UNION_LIBRE'];

  // Estilos comunes
  const textFieldProps = {
    size: 'small' as const,
    fullWidth: true,
    InputProps: { style: { fontSize: 12, height: 35 } },
    InputLabelProps: { style: { fontSize: 12, fontWeight: 'bold' } },
  };

  const selectProps = {
    size: 'small' as const,
    fullWidth: true,
    sx: { fontSize: 12, height: 35, minHeight: 35 },
    MenuProps: { PaperProps: { style: { fontSize: 12 } } },
  };

  const itemStyle = {
    flexBasis: { xs: "100%", sm: "48%" },
    minWidth: "200px",
  };

  const handleInputChange = (field: keyof ClienteData, value: any) => {
    setClienteData(prev => ({
      ...prev,
      [field]: value
    }));

    // Limpiar mensajes cuando el usuario empiece a escribir
    if (errorMessage || successMessage) {
      setErrorMessage('');
      setSuccessMessage('');
    }
  };

  const handleTipoIdentificacionChange = (tipo: 'CEDULA' | 'RUC') => {
    setClienteData(prev => ({
      ...prev,
      tipoIdentificacion: tipo,
      numeroDocumento: '',
      tipoPersona: 'NATURAL',
      apellidoPaterno: '',
      apellidoMaterno: '',
      primerNombre: '',
      segundoNombre: '',
      razonSocial: '',
    }));
  };

  const validarCampos = () => {
    if (!clienteData.numeroDocumento) {
      setErrorMessage('El número de documento es obligatorio');
      return false;
    }

    if (clienteData.tipoIdentificacion === 'CEDULA') {
      if (!clienteData.apellidoPaterno || !clienteData.primerNombre) {
        setErrorMessage('Apellido paterno y primer nombre son obligatorios');
        return false;
      }
    } else if (clienteData.tipoIdentificacion === 'RUC') {
      if (clienteData.tipoPersona === 'NATURAL') {
        if (!clienteData.apellidoPaterno || !clienteData.primerNombre) {
          setErrorMessage('Apellido paterno y primer nombre son obligatorios');
          return false;
        }
      } else if (clienteData.tipoPersona === 'JURIDICA') {
        if (!clienteData.razonSocial) {
          setErrorMessage('La razón social es obligatoria');
          return false;
        }
      }
    }

    if (!clienteData.telefono) {
      setErrorMessage('El teléfono es obligatorio');
      return false;
    }

    if (!clienteData.direccion) {
      setErrorMessage('La dirección es obligatoria');
      return false;
    }

    return true;
  };

  const handleRegistrar = () => {
    if (!validarCampos()) {
      return;
    }

    // Registrar el cliente
    console.log('Cliente registrado:', clienteData);
    setSuccessMessage('Cliente registrado correctamente');
    setErrorMessage('');
    
    // Limpiar formulario después de un tiempo
    setTimeout(() => {
      handleCerrar();
    }, 2000);
  };

  const handleCerrar = () => {
    setClienteData({
      tipoIdentificacion: 'CEDULA',
      numeroDocumento: '',
      tipoPersona: 'NATURAL',
      apellidoPaterno: '',
      apellidoMaterno: '',
      primerNombre: '',
      segundoNombre: '',
      razonSocial: '',
      telefono: '',
      direccion: '',
      correoElectronico: '',
      sexo: 'MASCULINO',
      estadoCivil: 'SOLTERO',
    });
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        border: '2px solid #4A90E2',
        borderRadius: 2,
        maxWidth: 700,
        mx: 'auto',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: '#1A3C6D',
          fontWeight: 'bold',
          mb: 2,
          textAlign: 'center',
        }}
      >
        DATOS DEL CLIENTE
      </Typography>

      {/* Alertas */}
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2, fontSize: 12 }}>
          {errorMessage}
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2, fontSize: 12 }}>
          {successMessage}
        </Alert>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
        {/* Tipo de Identificación */}
        <Box>
          <FormControl {...selectProps}>
            <InputLabel sx={{ fontWeight: 'bold' }}>TIPO DE IDENTIFICACIÓN</InputLabel>
            <Select
              label="TIPO DE IDENTIFICACIÓN"
              value={clienteData.tipoIdentificacion}
              onChange={(e) => handleTipoIdentificacionChange(e.target.value as 'CEDULA' | 'RUC')}
              {...selectProps}
            >
              <MenuItem value="CEDULA">CÉDULA</MenuItem>
              <MenuItem value="RUC">RUC</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Número de Documento */}
        <TextField
          label="N° DOCUMENTO *"
          value={clienteData.numeroDocumento}
          onChange={(e) => handleInputChange('numeroDocumento', e.target.value)}
          {...textFieldProps}
        />

        {/* Tipo de Persona (solo para RUC) */}
        {clienteData.tipoIdentificacion === 'RUC' && (
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
              TIPO DE PERSONA:
            </Typography>
            <RadioGroup
              row
              value={clienteData.tipoPersona}
              onChange={(e) => handleInputChange('tipoPersona', e.target.value)}
            >
              <FormControlLabel value="NATURAL" control={<Radio />} label="PERSONA NATURAL" />
              <FormControlLabel value="JURIDICA" control={<Radio />} label="PERSONA JURÍDICA" />
            </RadioGroup>
          </Box>
        )}

        {/* Campos según el tipo */}
        {(clienteData.tipoIdentificacion === 'CEDULA' || 
          (clienteData.tipoIdentificacion === 'RUC' && clienteData.tipoPersona === 'NATURAL')) && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <Box sx={itemStyle}>
              <TextField
                label="APELLIDO PATERNO *"
                value={clienteData.apellidoPaterno}
                onChange={(e) => handleInputChange('apellidoPaterno', e.target.value)}
                {...textFieldProps}
              />
            </Box>
            <Box sx={itemStyle}>
              <TextField
                label="APELLIDO MATERNO"
                value={clienteData.apellidoMaterno}
                onChange={(e) => handleInputChange('apellidoMaterno', e.target.value)}
                {...textFieldProps}
              />
            </Box>
            <Box sx={itemStyle}>
              <TextField
                label="PRIMER NOMBRE *"
                value={clienteData.primerNombre}
                onChange={(e) => handleInputChange('primerNombre', e.target.value)}
                {...textFieldProps}
              />
            </Box>
            <Box sx={itemStyle}>
              <TextField
                label="SEGUNDO NOMBRE"
                value={clienteData.segundoNombre}
                onChange={(e) => handleInputChange('segundoNombre', e.target.value)}
                {...textFieldProps}
              />
            </Box>
          </Box>
        )}

        {/* Razón Social (solo para persona jurídica) */}
        {clienteData.tipoIdentificacion === 'RUC' && clienteData.tipoPersona === 'JURIDICA' && (
          <TextField
            label="RAZÓN SOCIAL *"
            value={clienteData.razonSocial}
            onChange={(e) => handleInputChange('razonSocial', e.target.value)}
            {...textFieldProps}
          />
        )}

        {/* Campos adicionales */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Box sx={itemStyle}>
            <TextField
              label="TELÉFONO *"
              value={clienteData.telefono}
              onChange={(e) => handleInputChange('telefono', e.target.value)}
              {...textFieldProps}
            />
          </Box>
          <Box sx={itemStyle}>
            <TextField
              label="CORREO ELECTRÓNICO"
              type="email"
              value={clienteData.correoElectronico}
              onChange={(e) => handleInputChange('correoElectronico', e.target.value)}
              {...textFieldProps}
            />
          </Box>
        </Box>

        <TextField
          label="DIRECCIÓN *"
          value={clienteData.direccion}
          onChange={(e) => handleInputChange('direccion', e.target.value)}
          multiline
          rows={2}
          {...textFieldProps}
          InputProps={{
            ...textFieldProps.InputProps,
            style: { 
              ...textFieldProps.InputProps.style,
              height: 'auto',
              minHeight: 60,
            }
          }}
        />

        {/* Campos adicionales para personas naturales */}
        {(clienteData.tipoIdentificacion === 'CEDULA' || 
          (clienteData.tipoIdentificacion === 'RUC' && clienteData.tipoPersona === 'NATURAL')) && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <Box sx={itemStyle}>
              <FormControl {...selectProps}>
                <InputLabel sx={{ fontWeight: 'bold' }}>SEXO</InputLabel>
                <Select
                  label="SEXO"
                  value={clienteData.sexo}
                  onChange={(e) => handleInputChange('sexo', e.target.value)}
                  {...selectProps}
                >
                  {opcionesSexo.map((sexo) => (
                    <MenuItem key={sexo} value={sexo}>
                      {sexo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={itemStyle}>
              <FormControl {...selectProps}>
                <InputLabel sx={{ fontWeight: 'bold' }}>ESTADO CIVIL</InputLabel>
                <Select
                  label="ESTADO CIVIL"
                  value={clienteData.estadoCivil}
                  onChange={(e) => handleInputChange('estadoCivil', e.target.value)}
                  {...selectProps}
                >
                  {opcionesEstadoCivil.map((estado) => (
                    <MenuItem key={estado} value={estado}>
                      {estado.replace('_', ' ')}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        )}
      </Box>
    </Paper>
  );
}