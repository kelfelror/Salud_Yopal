package saludyopal.salud.yopal.service;

import org.springframework.stereotype.Service;
import saludyopal.salud.yopal.model.Cita;
import saludyopal.salud.yopal.repository.CitaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CitaService {

    private final CitaRepository citaRepository;

    public CitaService(CitaRepository citaRepository) {
        this.citaRepository = citaRepository;
    }


    // =========================
    // CREAR CITA
    // =========================

    public Cita crearCita(Cita cita) {

        return citaRepository.save(cita);
    }


    // =========================
    // OBTENER TODAS
    // =========================

    public List<Cita> obtenerTodas() {
    return citaRepository.findAll();
}

public List<Cita> obtenerPorUsuario(Long usuarioId) {
    return citaRepository.findByUsuarioId(usuarioId);
}


    // =========================
    // OBTENER POR ID
    // =========================

    public Optional<Cita> obtenerPorId(Long id) {

        return citaRepository.findById(id);
    }


    // =========================
    // ACTUALIZAR CITA
    // =========================

    public Cita actualizarCitaDeUsuario(Long id, Long usuarioId, Cita datosCita) {

    Cita cita = citaRepository.findByIdAndUsuarioId(id, usuarioId)
            .orElseThrow(() -> new RuntimeException("Cita no encontrada"));

    cita.setEps(datosCita.getEps());
    cita.setEspecialidad(datosCita.getEspecialidad());
    cita.setMedico(datosCita.getMedico());
    cita.setFecha(datosCita.getFecha());
    cita.setHora(datosCita.getHora());
    cita.setEstado(datosCita.getEstado());

    return citaRepository.save(cita);
}


    // =========================
    // ELIMINAR CITA
    // =========================

    public void eliminarCitaDeUsuario(Long id, Long usuarioId) {
    Cita cita = citaRepository.findByIdAndUsuarioId(id, usuarioId)
            .orElseThrow(() -> new RuntimeException("Cita no encontrada"));

    citaRepository.delete(cita);
    }
}