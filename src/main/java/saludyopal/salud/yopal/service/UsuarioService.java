package saludyopal.salud.yopal.service;

import org.springframework.stereotype.Service;
import saludyopal.salud.yopal.model.Usuario;
import saludyopal.salud.yopal.repository.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }


    // =========================
    // REGISTRAR USUARIO
    // =========================

    public Usuario registrarUsuario(Usuario usuario) {

        if (usuarioRepository.existsByCorreo(usuario.getCorreo())) {

            throw new RuntimeException(
                    "El correo ya está registrado"
            );
        }

        return usuarioRepository.save(usuario);
    }


    // =========================
    // INICIAR SESIÓN
    // =========================

    public Usuario iniciarSesion(
            String correo,
            String password) {

        Usuario usuario =
                usuarioRepository.findByCorreo(correo)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Usuario no encontrado"
                                )
                        );


        if (!usuario.getPassword().equals(password)) {

            throw new RuntimeException(
                    "Contraseña incorrecta"
            );
        }


        return usuario;
    }
}