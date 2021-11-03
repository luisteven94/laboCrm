package com.crm.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.crm.model.Consulta;
import com.crm.model.Mentor;

public interface IMentorRepo extends JpaRepository<Mentor, Integer>{

	

	@Query("from Mentor m "
			+ "where LOWER(m.nombres) like %:nombreCompleto% ")
	List<Mentor> buscar(@Param("nombreCompleto") String nombreCompleto);

}
