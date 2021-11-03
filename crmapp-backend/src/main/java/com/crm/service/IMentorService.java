package com.crm.service;

import java.util.List;

import com.crm.model.Consulta;
import com.crm.model.Mentor;

public interface IMentorService extends ICRUD<Mentor>{

	Mentor registrarTransaccional(Mentor mentor);
	
	List<Mentor> buscar(Mentor filtro);

}
