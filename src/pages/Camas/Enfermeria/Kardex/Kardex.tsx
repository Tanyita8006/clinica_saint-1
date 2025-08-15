import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Chip,
  Button,
  Alert,
  Autocomplete,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
} from '@mui/material';
import MedicationIcon from '@mui/icons-material/Medication';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import {
  Print as PrintIcon,
  Assignment as FormIcon,
} from "@mui/icons-material";
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VaccinesIcon from '@mui/icons-material/Vaccines';

interface MedicamentoData {
  fecha: string;
  medicamentos: string[];
  dosis: string;
  via: string;
  cadaCuantasHoras: string;
  cantidad: string; 
  frecuencia: string;
  horaInicio: string;
}

interface MedicamentoRegistrado extends MedicamentoData {
  id: number;
  fechaRegistro: string;
  estado: 'ACTIVO' | 'SUSPENDIDO' | 'COMPLETADO';
  responsable: string;
  esTermino?: boolean;
  idIngreso?: number; // Relaciona con el id de ingreso
}

interface MedicamentoItem {
  id: number;
  nombre: string;
  presentacion: string;
  concentracion: string;
}

export default function Medicamento() {
  // Simulación de usuario logueado
  const usuarioLogueado = "LCDO/A (logeado)";

  const [medicamentoData, setMedicamentoData] = useState<MedicamentoData>({
    fecha: '',
    medicamentos: [],
    dosis: '',
    via: '',
    cantidad: '',
    cadaCuantasHoras: '',
    frecuencia: '',
    horaInicio: '',
  });

  const [medicamentosRegistrados, setMedicamentosRegistrados] = useState<MedicamentoRegistrado[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Lista de medicamentos disponibles
  const medicamentosDisponibles: MedicamentoItem[] = [
    { id: 1, nombre: 'CLORURO DE SODIO', presentacion: 'Solución 0.9%', concentracion: '500ml' },
    { id: 2, nombre: 'DEXTROSA', presentacion: 'Solución 5%', concentracion: '500ml' },
    { id: 3, nombre: 'PARACETAMOL', presentacion: 'Tableta', concentracion: '500mg' },
    { id: 4, nombre: 'IBUPROFENO', presentacion: 'Tableta', concentracion: '400mg' },
    { id: 5, nombre: 'OMEPRAZOL', presentacion: 'Cápsula', concentracion: '20mg' },
    { id: 6, nombre: 'AMOXICILINA', presentacion: 'Cápsula', concentracion: '500mg' },
    { id: 7, nombre: 'TRAMADOL', presentacion: 'Ampolla', concentracion: '100mg/2ml' },
    { id: 8, nombre: 'METAMIZOL', presentacion: 'Ampolla', concentracion: '500mg/2ml' },
    { id: 9, nombre: 'FUROSEMIDA', presentacion: 'Ampolla', concentracion: '20mg/2ml' },
    { id: 10, nombre: 'INSULINA', presentacion: 'Vial', concentracion: '100UI/ml' },
  ];

  // Vías de administración
  const viasAdministracion = [
    { codigo: 'IV', nombre: 'Intravenoso' },
    { codigo: 'IM', nombre: 'Intramuscular' },
    { codigo: 'ID', nombre: 'Intradérmico' },
    { codigo: 'SC', nombre: 'Subcutáneo' },
    { codigo: 'V.O', nombre: 'Vía Oral' },
  ];

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

  useEffect(() => {
    // Establecer fecha actual
    const hoy = new Date().toLocaleDateString('es-EC', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    setMedicamentoData(prev => ({ ...prev, fecha: hoy }));
  }, []);

  const handleInputChange = (field: keyof MedicamentoData, value: any) => {
    setMedicamentoData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errorMessage || successMessage) {
      setErrorMessage('');
      setSuccessMessage('');
    }
  };

  const calcularFrecuenciaAutomatica = (horas: string) => {
    if (!horas || isNaN(Number(horas))) return '';
    const horasNum = Number(horas);
    if (horasNum === 8) return '3 veces al día';
    if (horasNum === 12) return '2 veces al día';
    if (horasNum === 24) return '1 vez al día';
    if (horasNum === 6) return '4 veces al día';
    if (horasNum === 4) return '6 veces al día';
    return `Cada ${horas} horas`;
  };

  const validarDatos = () => {
    if (!medicamentoData.fecha) {
      setErrorMessage('La fecha es obligatoria');
      return false;
    }
    if (medicamentoData.medicamentos.length === 0) {
      setErrorMessage('Debe seleccionar al menos un medicamento');
      return false;
    }
    if (!medicamentoData.dosis.trim()) {
      setErrorMessage('La dosis es obligatoria');
      return false;
    }
    if (!medicamentoData.via) {
      setErrorMessage('La vía de administración es obligatoria');
      return false;
    }
    if (!medicamentoData.cadaCuantasHoras) {
      setErrorMessage('Debe especificar cada cuántas horas');
      return false;
    }
    if (!medicamentoData.horaInicio) {
      setErrorMessage('La hora de inicio es obligatoria');
      return false;
    }
    return true;
  };

  const limpiarFormulario = () => {
    const hoy = new Date().toLocaleDateString('es-EC', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    setMedicamentoData({
      fecha: hoy,
      medicamentos: [],
      dosis: '',
      via: '',
      cantidad: '',
      cadaCuantasHoras: '',
      frecuencia: '',
      horaInicio: '',
    });
    setEditingId(null);
  };

  const handleGuardar = () => {
    if (!validarDatos()) return;

    const fechaRegistro = new Date().toLocaleString('es-EC');

    // cantidad por medicamento (si no viene o es inválida, usar 1)
    const qtyPerMed = Math.max(1, Math.floor(Number(medicamentoData.cantidad) || 1));

    // helpers para fecha/hora
    const pad = (n: number) => n.toString().padStart(2, '0');

    const parseFechaDDMMYYYY = (f: string) => {
      // espera 'DD/MM/YYYY'
      const parts = (f || '').split('/');
      if (parts.length !== 3) return new Date();
      const d = Number(parts[0]), m = Number(parts[1]) - 1, y = Number(parts[2]);
      return new Date(y, m, d);
    };

    const baseFecha = parseFechaDDMMYYYY(medicamentoData.fecha || new Date().toLocaleDateString('es-EC'));
    const [baseH, baseM] = (medicamentoData.horaInicio || '00:00').split(':').map(x => Number(x || 0));
    const intervaloHoras = Number(medicamentoData.cadaCuantasHoras) || 0;

    // Por cada medicamento seleccionado, crear 'qtyPerMed' filas con hora sumada por cada repetición
    const nuevosMedicamentos: MedicamentoRegistrado[] = [];
    medicamentoData.medicamentos.forEach((med, idx) => {
      for (let j = 0; j < qtyPerMed; j++) {
        // calcular nueva fecha/hora sumando j * intervaloHoras
        const nuevaFecha = new Date(baseFecha);
        const horasASumar = intervaloHoras ? j * intervaloHoras : 0;
        nuevaFecha.setHours(baseH + horasASumar, baseM, 0, 0);

        const horaStr = `${pad(nuevaFecha.getHours())}:${pad(nuevaFecha.getMinutes())}`;
        const fechaStr = nuevaFecha.toLocaleDateString('es-EC', { day: '2-digit', month: '2-digit', year: 'numeric' });

        nuevosMedicamentos.push({
          ...medicamentoData,
          medicamentos: [med],
          id: Date.now() + idx * 100 + j,
          fechaRegistro,
          estado: 'ACTIVO',
          responsable: usuarioLogueado,
          esTermino: false,
          // sobrescribir fecha y horaInicio para esta fila
          fecha: fechaStr,
          horaInicio: horaStr,
        });
      }
    });

    setMedicamentosRegistrados(prev => [...prev, ...nuevosMedicamentos]);
    setSuccessMessage(`${nuevosMedicamentos.length} fila(s) registrada(s) correctamente`);
    limpiarFormulario();
    setErrorMessage('');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleAgregarTermino = (medicamento: MedicamentoRegistrado) => {
    // Solo agregar si no existe ya un término para este ingreso
    const yaExiste = medicamentosRegistrados.some(
      m => m.idIngreso === medicamento.id && m.esTermino
    );
    if (yaExiste) return;

    const fechaRegistro = new Date().toLocaleString('es-EC');
    const nuevoTermino: MedicamentoRegistrado = {
      ...medicamento,
      id: Date.now(),
      fechaRegistro,
      estado: 'COMPLETADO',
      responsable: usuarioLogueado,
      esTermino: true,
      idIngreso: medicamento.id,
    };
    setMedicamentosRegistrados(prev => [...prev, nuevoTermino]);
    setSuccessMessage('Término de medicamento registrado');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleEditar = (medicamento: MedicamentoRegistrado) => {
    setMedicamentoData({
      fecha: medicamento.fecha,
      medicamentos: medicamento.medicamentos,
      dosis: medicamento.dosis,
      via: medicamento.via,
      cantidad: medicamento.cantidad,
      cadaCuantasHoras: medicamento.cadaCuantasHoras,
      frecuencia: medicamento.frecuencia,
      horaInicio: medicamento.horaInicio,
    });
    setEditingId(medicamento.id);
    setErrorMessage('');
    setSuccessMessage('');
  };


  // Cambia el estado a 'SUSPENDIDO' y colorea la fila de rojo
  const handleSuspender = (id: number) => {
    setMedicamentosRegistrados(prev =>
      prev.map(med =>
        med.id === id ? { ...med, estado: 'SUSPENDIDO' } : med
      )
    );
    setSuccessMessage('Medicamento suspendido');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Determina el color de la fila según el estado y si tiene término
  const getRowColor = (med: MedicamentoRegistrado) => {
    if (med.estado === 'SUSPENDIDO') return '#FFCDD2'; // rojo claro
    const tieneTermino = medicamentosRegistrados.some(
      m => m.idIngreso === med.id && m.esTermino
    );
    if (med.esTermino || tieneTermino) return '#C8E6C9'; // verde claro
    return '#ECECEC'; // gris claro
  };



  const handleLimpiar = () => {
    limpiarFormulario();
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h6"
        sx={{
          color: '#1A3C6D',
          fontWeight: 'bold',
          mb: 3,
          textAlign: 'left',
        }}
      >
        <MedicationIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        ADMINISTRACIÓN DE MEDICAMENTOS
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

      {/* Formulario */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 'bold', mb: 2, color: '#1A3C6D' }}
        >
          {editingId ? 'EDITAR MEDICAMENTO' : 'REGISTRAR NUEVO MEDICAMENTO'}
        </Typography>

        {/* Fila 1: Fecha, Responsable y Medicamentos */}
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          mb: 3,
          alignItems: 'flex-start'
        }}>
          <Box sx={{ flex: '1 1 150px', minWidth: '120px' }}>
            <TextField
              label="FECHA *"
              value={medicamentoData.fecha}
              onChange={(e) => handleInputChange('fecha', e.target.value)}
              {...textFieldProps}
              placeholder="DD/MM/YYYY"
              InputProps={{
                ...textFieldProps.InputProps,
                style: { ...textFieldProps.InputProps.style, backgroundColor: '#F0F8FF' }
              }}
            />
          </Box>

          <Box sx={{ flex: '1 1 250px', minWidth: '200px' }}>
            <TextField
              label="RESPONSABLE"
              value={usuarioLogueado}
              disabled
              {...textFieldProps}
              InputProps={{
                ...textFieldProps.InputProps,
                startAdornment: <PersonIcon sx={{ mr: 1, fontSize: 16, color: '#9C27B0' }} />
              }}
            />
          </Box>

          <Box sx={{ flex: '2 1 300px', minWidth: '250px' }}>
            <Autocomplete
              multiple
              options={medicamentosDisponibles.map(med => `${med.nombre} - ${med.presentacion} ${med.concentracion}`)}
              value={medicamentoData.medicamentos}
              onChange={(event, newValue) => handleInputChange('medicamentos', newValue)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option.split(' - ')[0]}
                    {...getTagProps({ index })}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="MEDICAMENTOS *"
                  placeholder="Seleccione uno o varios medicamentos"
                  {...textFieldProps}
                  InputProps={{
                    ...params.InputProps,
                    style: { ...textFieldProps.InputProps.style, height: 'auto', minHeight: 35 }
                  }}
                />
              )}
              size="small"
            />
          </Box>
        </Box>

        {/* Fila 2: Dosis y Vía */}
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          mb: 3,
          alignItems: 'flex-end'
        }}>
          <Box sx={{ flex: '1 1 200px', minWidth: '150px' }}>
            <TextField
              label="DOSIS *"
              value={medicamentoData.dosis}
              onChange={(e) => handleInputChange('dosis', e.target.value)}
              {...textFieldProps}
              placeholder="Ej: 500mg, 1 tableta"
              InputProps={{
                ...textFieldProps.InputProps,
                startAdornment: <LocalPharmacyIcon sx={{ mr: 1, fontSize: 16, color: '#4CAF50' }} />,
              }}
            />
          </Box>

          <Box sx={{ flex: '1 1 200px', minWidth: '150px' }}>
            <FormControl {...selectProps}>
              <InputLabel sx={{ fontWeight: 'bold' }}>VÍA *</InputLabel>
              <Select
                label="VÍA *"
                value={medicamentoData.via}
                onChange={(e) => handleInputChange('via', e.target.value)}
                {...selectProps}
              >
                {viasAdministracion.map((via) => (
                  <MenuItem key={via.codigo} value={via.codigo}>
                    {via.codigo}: {via.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Fila 3: Frecuencia y Horarios */}
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          mb: 3,
          alignItems: 'flex-end'
        }}>
          <Box sx={{ flex: '1 1 150px', minWidth: '120px' }}>
            <TextField
              label="CADA CUÁNTAS HORAS *"
              value={medicamentoData.cadaCuantasHoras}
              onChange={(e) => {
                handleInputChange('cadaCuantasHoras', e.target.value);
                const frecuenciaAuto = calcularFrecuenciaAutomatica(e.target.value);
                if (frecuenciaAuto) {
                  handleInputChange('frecuencia', frecuenciaAuto);
                }
              }}
              {...textFieldProps}
              placeholder="Ej: 8, 12, 24"
              InputProps={{
                ...textFieldProps.InputProps,
                startAdornment: <AccessTimeIcon sx={{ mr: 1, fontSize: 16, color: '#FF9800' }} />,
              }}
            />
          </Box>

            <Box sx={{ flex: '1 1 150px', minWidth: '120px' }}>
            <TextField
              label="REPETICION *"
              value={medicamentoData.cantidad}
              onChange={(e) => {
                handleInputChange('cantidad', e.target.value);
                const frecuenciaAuto = calcularFrecuenciaAutomatica(e.target.value);
                if (frecuenciaAuto) {
                  handleInputChange('frecuencia', frecuenciaAuto);
                }
              }}
              {...textFieldProps}
              InputProps={{
                ...textFieldProps.InputProps,
              }}
            />
          </Box>
           <Box sx={{ flex: '1 1 150px', minWidth: '120px' }}>
            <TextField
              label="CANTIDAD *"
              value={medicamentoData.cantidad}
              onChange={(e) => {
                handleInputChange('cantidad', e.target.value);
                const frecuenciaAuto = calcularFrecuenciaAutomatica(e.target.value);
                if (frecuenciaAuto) {
                  handleInputChange('frecuencia', frecuenciaAuto);
                }
              }}
              {...textFieldProps}
              InputProps={{
                ...textFieldProps.InputProps,
              }}
            />
          </Box>

          <Box sx={{ flex: '2 1 300px', minWidth: '200px' }}>
            <TextField
              label="FRECUENCIA"
              value={medicamentoData.frecuencia}
              onChange={(e) => handleInputChange('frecuencia', e.target.value)}
              {...textFieldProps}
              placeholder="Ej: ml/h, 20gtsxmin, 3 veces al día"
              helperText="Editable según indicación médica"
            />
          </Box>

          <Box sx={{ flex: '1 1 120px', minWidth: '100px' }}>
            <TextField
              label="HORA INICIO *"
              value={medicamentoData.horaInicio}
              onChange={(e) => handleInputChange('horaInicio', e.target.value)}
              {...textFieldProps}
              placeholder="HH:MM"
              type="time"
            />
          </Box>
        </Box>

        {/* Botones */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            onClick={handleGuardar}
            sx={{
              background: "#1A3C6D",
              "&:hover": { background: "#274472" },
              fontSize: "0.8rem"
            }}
            startIcon={<SaveIcon />}
          >
            {editingId ? 'ACTUALIZAR' : 'GUARDAR'}
          </Button>
          <Button
            variant="outlined"
            onClick={handleLimpiar}
            sx={{
              borderColor: "#1A3C6D",
              color: "#1A3C6D",
              "&:hover": { borderColor: "#274472", color: "#274472" },
              fontSize: "0.8rem"
            }}
            startIcon={<ClearIcon />}
          >
            {editingId ? 'CANCELAR' : 'LIMPIAR'}
          </Button>
        </Box>
      </Paper>

      {/* Tabla de Medicamentos Registrados */}
      <Paper elevation={2}>
        <Box sx={{ p: 2, backgroundColor: '#F5F5F5', borderBottom: '1px solid #E0E0E0' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1A3C6D' }}>
            MEDICAMENTOS REGISTRADOS ({medicamentosRegistrados.length})
          </Typography>
        </Box>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#F5F5F5' }}>
                <TableCell sx={{ fontWeight: 'bold', fontSize: 11 }}>FECHA</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: 11 }}>RESPONSABLE</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: 11 }}>MEDICAMENTO</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: 11 }}>DOSIS</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: 11 }}>VÍA</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: 11 }}>FRECUENCIA</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: 11 }}>INICIO</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: 11 }}>ACCIONES</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medicamentosRegistrados
                .sort((a) => (a.esTermino ? 1 : -1)) // Mostrar ingreso antes que término
                .map((medicamento) => {
                  const rowColor = getRowColor(medicamento);
                  const tieneTermino = medicamentosRegistrados.some(
                    m => m.idIngreso === medicamento.id && m.esTermino
                  );
                  // Solo mostrar acciones si la fila es gris (no suspendido ni completado)
                  const mostrarAcciones =
                    medicamento.estado !== 'SUSPENDIDO' &&
                    !medicamento.esTermino &&
                    !tieneTermino;

                  return (
                    <TableRow
                      key={medicamento.id}
                      hover
                      sx={{
                        backgroundColor: rowColor,
                        transition: 'background 0.3s',
                        opacity: medicamento.estado === 'SUSPENDIDO' ? 0.7 : 1,
                      }}
                    >
                      <TableCell sx={{ fontSize: 11 }}>{medicamento.fecha}</TableCell>
                      <TableCell sx={{ fontSize: 11 }}>
                        <Box>
                          <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#9C27B0', fontSize: 10 }}>
                            {medicamento.responsable}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontSize: 11 }}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {medicamento.medicamentos.map((med, index) => (
                            <Chip
                              key={index}
                              label={med.split(' - ')[0]}
                              size="small"
                              variant="outlined"
                              color={medicamento.esTermino ? "default" : "primary"}
                              sx={{ fontSize: 9 }}
                            />
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontSize: 11, fontWeight: 'bold', color: '#4CAF50' }}>
                        {medicamento.dosis}
                      </TableCell>
                      <TableCell sx={{ fontSize: 11 }}>{medicamento.via}</TableCell>
                      <TableCell sx={{ fontSize: 11 }}>{medicamento.frecuencia}</TableCell>
                      <TableCell sx={{ fontSize: 11 }}>{medicamento.horaInicio}</TableCell>
                      <TableCell sx={{ fontSize: 11 }}>
                        {mostrarAcciones && (
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <Tooltip title="Registrar término">
                              <IconButton
                                size="small"
                                color="info"
                                onClick={() => handleAgregarTermino(medicamento)}
                                disabled={tieneTermino}
                              >
                                <VaccinesIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Editar">
                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() => handleEditar(medicamento)}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Suspender">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleSuspender(medicamento.id)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {medicamentosRegistrados.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} sx={{ textAlign: 'center', py: 3 }}>
                    <Typography variant="body2" color="textSecondary">
                      No hay medicamentos registrados
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
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
                GUARDAR
              </Button>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                size="small"
                sx={{ 
                  color: "#1A3C6D", 
                  borderColor: "#1A3C6D",
                  fontSize: "0.8rem"
                }}
              >
                EDITAR
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
            </Box>
    </Box>
  );
}