package saludyopal.salud.yopal.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import saludyopal.salud.yopal.model.LoginRequest;
import saludyopal.salud.yopal.model.Usuario;
import saludyopal.salud.yopal.service.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // =========================
    // REGISTRO
    // =========================

    @PostMapping("/registro")
    public ResponseEntity<?> registrarUsuario(
            @RequestBody Usuario usuario) {

        try {

            Usuario usuarioCreado =
                    usuarioService.registrarUsuario(usuario);

            return ResponseEntity.ok(usuarioCreado);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // =========================
    // LOGIN
    // =========================

    @PostMapping("/login")
    public ResponseEntity<?> iniciarSesion(
            @RequestBody LoginRequest datos) {

        try {

            Usuario usuario =
                    usuarioService.iniciarSesion(
                            datos.getCorreo(),
                            datos.getPassword()
                    );

            return ResponseEntity.ok(usuario);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
}