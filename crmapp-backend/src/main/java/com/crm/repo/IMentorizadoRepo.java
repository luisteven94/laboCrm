package com.crm.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.crm.model.Consulta;
import com.crm.model.Mentor;
import com.crm.model.Mentorizado;

public interface IMentorizadoRepo extends JpaRepository<Mentorizado, Integer>{

	

	@Query("from Mentorizado m "
			+ "where LOWER(m.nombres) like %:nombreCompleto% ")
	List<Mentorizado> buscar(@Param("nombreCompleto") String nombreCompleto);

}
