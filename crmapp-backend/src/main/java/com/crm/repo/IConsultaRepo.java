package com.crm.repo;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.crm.model.Consulta;

public interface IConsultaRepo extends JpaRepository<Consulta, Integer> {
	
	@Query("from Consulta c "
			+ "where  LOWER(c.mentorizado.nombres) like %:nombreCompleto% ")
	List<Consulta> buscar(@Param("nombreCompleto") String nombreCompleto);

	// >= <
	@Query("from Consulta c where c.fecha between :fechaConsulta and :fechaSgte")
	List<Consulta> buscarFecha(@Param("fechaConsulta") LocalDateTime fechaConsulta, @Param("fechaSgte") LocalDateTime fechaSgte);

	@Query(value = "select * from fn_listarResumen()", nativeQuery = true)
	List<Object[]> listarResumen();
	
	//cantidad		fecha
	//[4		,	11/05/2019]
	//[1		, 	18/05/2019]
}
