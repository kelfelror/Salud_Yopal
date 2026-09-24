package saludyopal.salud.yopal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import saludyopal.salud.yopal.model.Usuario;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByCorreo(String correo);

    boolean existsByCorreo(String correo);
}