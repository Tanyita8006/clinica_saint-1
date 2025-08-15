import React, { useState } from "react";
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
  Divider,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const nacionalidades = [
  "ECUATORIANA",
  "COLOMBIANA",
  "PERUANA",
  "VENEZOLANA",
  "OTRA",
];

const estadosCiviles = [
  "SOLTERO",
  "CASADO",
  "DIVORCIADO",
  "VIUDO",
  "UNIÓN LIBRE",
  "UNIÓN DE HECHO",
];

const tiposIdentificacion = [
  "CÉDULA",
  "PASAPORTE",
  "CARNET/REFUGIADO",
  "SIN DOCUMENTO",
];

const nivelesEducacion = ["PRIMARIA", "SECUNDARIA", "SUPERIOR", "NINGUNO"];

const estadoNivelEducacion = ["TERMINADO", "EN CURSO"];

const tiposEmpresa = ["PÚBLICA", "PRIVADA"];

const segurosSalud = ["ISSPOL", "ISSFA", "PRIVADO", "NINGUNO"];

const parentescos = [
  "HIJO(A)",
  "ESPOSO(A)",
  "HERMANO(A)",
  "MADRE",
  "PADRE",
  "SOBRINO(A)",
  "SUEGRO(A)",
  "TÍO(A)",
  "PRIMO(A)",
  "CUÑADO(A)",
  "ABUELO(A)",
  "NUERA",
  "YERNO",
  "OTROS",
];

const formasLlegada = ["AMBULATORIO", "AMBULANCIA", "OTRO TRANSPORTE"];

const categoriasConvenio = [
  "PARTICULARES",
  "SEGUROS",
  "CORPORATIVOS",
  "AFILIACION",
  "LATINA PREPAGADA",
  "LATINA SEGUROS",
  "PAN AMERICAN LIFE",
];

const convenios = ["LATINA PREPAGADA", "LATINA SEGUROS", "PAN AMERICAN LIFE"];

// Se han reducido los tamaños de fuente y la altura de los inputs (de 15 a 13 y de 40 a 35 px respectivamente)
const textFieldProps = {
  size: "small" as const,
  fullWidth: true,
  InputProps: { style: { fontSize: 13, height: 35 } },
  InputLabelProps: { style: { fontSize: 13 } },
};

const selectProps = {
  size: "small" as const,
  fullWidth: true,
  sx: { fontSize: 13, height: 35, minHeight: 35, minWidth: 220 },
  MenuProps: { PaperProps: { style: { fontSize: 13 } } },
};

const formControlProps = {
  size: "small" as const,
  fullWidth: true,
  sx: { minHeight: 35, minWidth: 220 },
};

const Admision: React.FC = () => {
  // ESTADO PARA EXTRANJERO Y NACIONALIDAD
  const [esExtranjero, setEsExtranjero] = useState(false);
  const [nacionalidad, setNacionalidad] = useState("ECUATORIANA");
  // ESTADO PARA FECHA DE NACIMIENTO Y EDAD
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [edad, setEdad] = useState("");

  // CALCULAR EDAD AUTOMÁTICAMENTE AL CAMBIAR LA FECHA DE NACIMIENTO
  const handleFechaNacimiento = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fecha = e.target.value;
    setFechaNacimiento(fecha);
    if (fecha) {
      const hoy = new Date();
      const nacimiento = new Date(fecha);
      let years = hoy.getFullYear() - nacimiento.getFullYear();
      const m = hoy.getMonth() - nacimiento.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
        years--;
      }
      setEdad(years >= 0 ? years.toString() : "");
    } else {
      setEdad("");
    }
  };

  return (
    <Box className="root-container">
      <Paper
        elevation={8}
        sx={{
          borderRadius: 4,
          bgcolor: "#FFFFFF",
          border: "3px solid #4A90E2",
          width: "100%",
          mx: "auto",
          p: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: "#1A3C6D",
            textAlign: "left",
            mb: 3,
          }}
        >
          ADMISION PACIENTE
        </Typography>

        {/* DATOS IDENTIFICATORIOS */}
        <SectionTitle title="DATOS IDENTIFICATORIOS" />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
          <Box sx={{ flex: "1 1 200px" }}>
            <TextField
              label="APELLIDO PATERNO"
              required
              {...textFieldProps}
            />
          </Box>
          <Box sx={{ flex: "1 1 200px" }}>
            <TextField
              label="APELLIDO MATERNO"
              required
              {...textFieldProps}
            />
          </Box>
          <Box sx={{ flex: "1 1 200px" }}>
            <TextField
              label="PRIMER NOMBRE"
              required
              {...textFieldProps}
            />
          </Box>
          <Box sx={{ flex: "1 1 200px" }}>
            <TextField label="SEGUNDO NOMBRE" {...textFieldProps} />
          </Box>
          <Box sx={{ flex: "1 1 150px" }}>
            <TextField label="HISTORIA CLÍNICA" {...textFieldProps} />
          </Box>
          <Box sx={{ flex: "1 1 150px" }}>
            <TextField
              label="CÉDULA / PASAPORTE"
              {...textFieldProps}
              InputProps={{
                ...textFieldProps.InputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="BUSCAR POR CÉDULA">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{ flex: "1 1 150px" }}>
            <FormControl fullWidth size="small" sx={{ minWidth: 120 }}>
              <InputLabel>SEXO</InputLabel>
              <Select label="SEXO" sx={{ minWidth: 120 }}>
                <MenuItem value="M">MASCULINO</MenuItem>
                <MenuItem value="F">FEMENINO</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: "1 1 200px" }}>
            <TextField
              label="FECHA DE NACIMIENTO"
              type="date"
              {...textFieldProps}
              InputLabelProps={{
                ...textFieldProps.InputLabelProps,
                shrink: true,
              }}
              value={fechaNacimiento}
              onChange={handleFechaNacimiento}
            />
          </Box>
          <Box sx={{ flex: "0 1 80px" }}>
            <TextField
              label="EDAD"
              {...textFieldProps}
              sx={{ maxWidth: 80 }}
              value={edad}
              disabled
            />
          </Box>
          <Box sx={{ flex: "0 1 80px", display: "flex", alignItems: "center" }}>
            <FormControlLabel control={<Checkbox />} label="ADULTO" />
          </Box>
          <Box sx={{ flex: "0 1 80px", display: "flex", alignItems: "center" }}>
            <FormControlLabel control={<Checkbox />} label="RN" />
          </Box>
        </Box>

        {/* PROVINCIA, CANTÓN Y PARROQUIA */}
        <SectionTitle title="PROVINCIA, CANTÓN Y PARROQUIA" />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
          <Box sx={{ flex: "0 1 150px", display: "flex", alignItems: "center" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={esExtranjero}
                  onChange={(_, checked) => {
                    setEsExtranjero(checked);
                    setNacionalidad(checked ? "" : "ECUATORIANA");
                  }}
                />
              }
              label="EXTRANJERO"
            />
          </Box>
          <Box sx={{ flex: "1 1 150px" }}>
            <FormControl {...formControlProps} disabled={!esExtranjero}>
              <InputLabel>NACIONALIDAD</InputLabel>
              <Select
                label="NACIONALIDAD"
                {...selectProps}
                value={esExtranjero ? nacionalidad : "ECUATORIANA"}
                onChange={(e) => setNacionalidad(e.target.value)}
              >
                {nacionalidades.map((nac) => (
                  <MenuItem key={nac} value={nac}>
                    {nac}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: "1 1 150px" }}>
            <FormControl fullWidth size="small" sx={{ minWidth: 120 }}>
              <InputLabel>PAÍS</InputLabel>
              <Select label="PAÍS" sx={{ minWidth: 120 }}>
                <MenuItem value="ECUADOR">ECUADOR</MenuItem>
                <MenuItem value="OTRO">OTRO</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: "1 1 150px" }}>
            <FormControl {...formControlProps}>
              <InputLabel>PROVINCIA RESIDE</InputLabel>
              <Select label="PROVINCIA RESIDE" {...selectProps}>
                <MenuItem value="IMBABURA">IMBABURA</MenuItem>
                <MenuItem value="PICHINCHA">PICHINCHA</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: "1 1 150px" }}>
            <FormControl {...formControlProps}>
              <InputLabel>CANTÓN RESIDE</InputLabel>
              <Select label="CANTÓN RESIDE" {...selectProps}>
                <MenuItem value="GUAYAQUIL">GUAYAQUIL</MenuItem>
                <MenuItem value="OTRO">OTRO</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: "1 1 150px" }}>
            <FormControl {...formControlProps}>
              <InputLabel>ESTADO CIVIL</InputLabel>
              <Select label="ESTADO CIVIL" {...selectProps}>
                {estadosCiviles.map((estado) => (
                  <MenuItem key={estado} value={estado}>
                    {estado}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
          <Box sx={{ flex: "1 1 200px" }}>
            <TextField label="DIRECCIÓN" {...textFieldProps} />
          </Box>
          <Box sx={{ flex: "1 1 200px" }}>
            <TextField label="BARRIO/SECTOR" {...textFieldProps} />
          </Box>
          <Box sx={{ flex: "1 1 200px" }}>
            <TextField label="C. PRINCIPAL" {...textFieldProps} />
          </Box>
          <Box sx={{ flex: "1 1 200px" }}>
            <TextField label="C. SECUNDARIA" {...textFieldProps} />
          </Box>
          <Box sx={{ flex: "1 1 200px" }}>
            <TextField label="LUGAR NACIMIENTO" {...textFieldProps} />
          </Box>
        </Box>

        {/* TELEFONOS PACIENTES */}
        <SectionTitle title="TELEFONOS PACIENTES" />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
          <Box sx={{ flex: "1 1 250px" }}>
            <TextField label="MEDIO" {...textFieldProps} />
          </Box>
          <Box sx={{ flex: "1 1 250px" }}>
            <TextField label="NÚMERO" {...textFieldProps} />
          </Box>
          <Box sx={{ flex: "1 1 250px" }}>
            <TextField label="OBSERVACIÓN" {...textFieldProps} />
          </Box>
        </Box>

        {/* DATOS CONVENIOS */}
        <SectionTitle title="DATOS CONVENIOS" />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
          <Box sx={{ flex: "1 1 250px" }}>
            <FormControl {...formControlProps}>
              <InputLabel>CATEGORÍA</InputLabel>
              <Select label="CATEGORÍA" {...selectProps}>
                {categoriasConvenio.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: "1 1 250px" }}>
            <FormControl {...formControlProps}>
              <InputLabel>CONVENIO</InputLabel>
              <Select label="CONVENIO" {...selectProps}>
                {convenios.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: "1 1 250px" }}>
            <TextField label="EMPRESA" {...textFieldProps} />
          </Box>
        </Box>

        {/* DATOS COMPLEMENTARIOS HOJA ADMISION */}
        <SectionTitle title="DATOS COMPLEMENTARIOS HOJA ADMISION" />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
          <Box sx={{ flex: "1 1 200px" }}>
            <FormControl {...formControlProps}>
              <InputLabel>NIVEL DE INSTRUCCIÓN</InputLabel>
              <Select label="NIVEL DE INSTRUCCIÓN" {...selectProps}>
                {nivelesEducacion.map((nivel) => (
                  <MenuItem key={nivel} value={nivel}>
                    {nivel}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: "1 1 200px" }}>
            <FormControl {...formControlProps}>
              <InputLabel>ESTADO NIVEL EDUCACIÓN</InputLabel>
              <Select label="ESTADO NIVEL EDUCACIÓN" {...selectProps}>
                {estadoNivelEducacion.map((estado) => (
                  <MenuItem key={estado} value={estado}>
                    {estado}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: "1 1 200px" }}>
            <TextField
              label="OCUPACIÓN Y EMPRESA TRABAJO"
              {...textFieldProps}
            />
          </Box>
          <Box sx={{ flex: "1 1 200px" }}>
            <FormControl {...formControlProps}>
              <InputLabel>TIPO EMPRESA</InputLabel>
              <Select label="TIPO EMPRESA" {...selectProps}>
                {tiposEmpresa.map((tipo) => (
                  <MenuItem key={tipo} value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: "1 1 200px" }}>
            <TextField label="ETNIA" {...textFieldProps} />
          </Box>
          <Box sx={{ flex: "1 1 200px" }}>
            <TextField label="NACIONALIDAD ÉTNICA" {...textFieldProps} />
          </Box>
          <Box sx={{ flex: "1 1 200px" }}>
            <TextField label="PUEBLO" {...textFieldProps} />
          </Box>
          <Box sx={{ flex: "1 1 200px" }}>
            <TextField label="GRUPO CULTURAL / ZONA" {...textFieldProps} />
          </Box>
          <Box sx={{ flex: "1 1 200px" }}>
            <TextField label="GRUPO PRIORITARIO" {...textFieldProps} />
          </Box>
          <Box sx={{ flex: "1 1 200px" }}>
            <TextField label="TIPO BONO" {...textFieldProps} />
          </Box>
          <Box sx={{ flex: "1 1 200px" }}>
            <TextField label="MÉDICO TRATANTE" {...textFieldProps} />
          </Box>
        </Box>

        {/* EN CASO NECESARIO LLAMAR A: */}
        <SectionTitle title="EN CASO NECESARIO LLAMAR A:" />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
          <Box sx={{ flex: "1 1 150px" }}>
            <TextField label="CÉDULA" {...textFieldProps} />
          </Box>
          <Box sx={{ flex: "1 1 200px" }}>
            <TextField label="NOMBRE" {...textFieldProps} />
          </Box>
          <Box sx={{ flex: "1 1 200px" }}>
            <FormControl {...formControlProps}>
              <InputLabel>AFINIDAD</InputLabel>
              <Select label="AFINIDAD" {...selectProps}>
                {parentescos.map((par) => (
                  <MenuItem key={par} value={par}>
                    {par}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: "1 1 200px" }}>
            <TextField label="DIRECCIÓN" {...textFieldProps} />
          </Box>
          <Box sx={{ flex: "1 1 150px" }}>
            <TextField label="TELÉFONO" {...textFieldProps} />
          </Box>
        </Box>

        {/* OPCIONES */}
        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <Button variant="contained" color="primary">
            REGISTRAR
          </Button>
          <Button variant="outlined" color="primary" disabled>
            ACTUALIZAR
          </Button>
          <Button variant="contained" color="secondary">
            NUEVO
          </Button>
          <Button variant="outlined" color="secondary">
            VOLVER
          </Button>
        </Box>
        <Box sx={{ mt: 2, textAlign: "right" }}>
          <Typography variant="caption" color="text.secondary">
            {new Date().toLocaleDateString()}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

// COMPONENTE PARA EL TÍTULO DE SECCIÓN
interface SectionTitleProps {
  title: string;
}
const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => (
  <Box sx={{ mt: 3, mb: 1 }}>
    <Divider sx={{ mb: 1, borderColor: "#B6D7ED", borderWidth: 2 }} />
    <Typography
      variant="h6"
      fontWeight={700}
      color="#1A3C6D"
      sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
    >
      {title}
    </Typography>
  </Box>
);

export default Admision;