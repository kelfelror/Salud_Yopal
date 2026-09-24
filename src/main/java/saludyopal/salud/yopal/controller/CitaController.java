package saludyopal.salud.yopal.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import saludyopal.salud.yopal.model.Cita;
import saludyopal.salud.yopal.model.Usuario;
import saludyopal.salud.yopal.repository.UsuarioRepository;
import saludyopal.salud.yopal.service.CitaService;

import java.util.List;

@RestController
@RequestMapping("/api/citas")
@CrossOrigin(origins = "*")
public class CitaController {

    private final CitaService citaService;
    private final UsuarioRepository usuarioRepository;

    public CitaController(
            CitaService citaService,
            UsuarioRepository usuarioRepository) {

        this.citaService = citaService;
        this.usuarioRepository = usuarioRepository;
    }


    // =========================
    // CREAR CITA
    // =========================

    @PostMapping
    public ResponseEntity<?> crearCita(
            @RequestParam Long usuarioId,
            @RequestBody Cita cita) {

        try {

            Usuario usuario =
                    usuarioRepository.findById(usuarioId)
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Usuario no encontrado"
                                    )
                            );

            cita.setUsuario(usuario);

            Cita citaCreada =
                    citaService.crearCita(cita);

            return ResponseEntity.ok(citaCreada);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }


    // =========================
    // OBTENER TODAS
    // =========================

    @GetMapping
public List<Cita> obtenerTodas() {
    return citaService.obtenerTodas();
}

@GetMapping("/usuario/{usuarioId}")
public List<Cita> obtenerPorUsuario(@PathVariable Long usuarioId) {
    return citaService.obtenerPorUsuario(usuarioId);
}


    // =========================
    // OBTENER POR ID
    // =========================

    @GetMapping("/{id}")
    public ResponseEntity<Cita> obtenerPorId(
            @PathVariable Long id) {

        return citaService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity
                                .notFound()
                                .build()
                );
    }


    // =========================
    // ACTUALIZAR
    // =========================

    @PutMapping("/{id}")
public ResponseEntity<Cita> actualizarCita(
        @PathVariable Long id,
        @RequestParam Long usuarioId,
        @RequestBody Cita cita) {

    try {
        return ResponseEntity.ok(
            citaService.actualizarCitaDeUsuario(id, usuarioId, cita)
        );
    } catch (RuntimeException e) {
        return ResponseEntity.notFound().build();
    }
}


    // =========================
    // ELIMINAR
    // =========================

    @DeleteMapping("/{id}")
public ResponseEntity<Void> eliminarCita(
        @PathVariable Long id,
        @RequestParam Long usuarioId) {

    try {
        citaService.eliminarCitaDeUsuario(id, usuarioId);
        return ResponseEntity.noContent().build();
    } catch (RuntimeException e) {
        return ResponseEntity.notFound().build();
    }
}
}