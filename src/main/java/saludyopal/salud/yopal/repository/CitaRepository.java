package saludyopal.salud.yopal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import saludyopal.salud.yopal.model.Cita;

import java.util.List;
import java.util.Optional;

public interface CitaRepository extends JpaRepository<Cita, Long> {

    List<Cita> findByUsuarioId(Long usuarioId);

    Optional<Cita> findByIdAndUsuarioId(Long id, Long usuarioId);
}