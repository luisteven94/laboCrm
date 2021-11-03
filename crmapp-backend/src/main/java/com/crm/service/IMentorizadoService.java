package com.crm.service;

import java.util.List;

import com.crm.model.Mentorizado;

public interface IMentorizadoService extends ICRUD<Mentorizado> {

	Mentorizado registrarTransaccional(Mentorizado mentor);

	List<Mentorizado> buscar(Mentorizado filtro);

}
