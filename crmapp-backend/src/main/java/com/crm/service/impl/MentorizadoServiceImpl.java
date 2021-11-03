package com.crm.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.crm.model.Mentor;
import com.crm.model.Mentorizado;
import com.crm.repo.IMentorizadoRepo;
import com.crm.service.IMentorizadoService;

@Service
public class MentorizadoServiceImpl implements IMentorizadoService{

	@Autowired	
	private IMentorizadoRepo repo;
	
 
	
	@Transactional
	@Override
	public Mentorizado registrarTransaccional(Mentorizado mentor) {
  		
 		return repo.save(mentor);
	}

	
	
	@Override
	public List<Mentorizado> buscar(Mentorizado filtro) {		
		return repo.buscar(filtro.getNombres());
	}
	
	 
	@Override
	public Mentorizado modificar(Mentorizado obj) {
		return repo.save(obj);
	}


	@Override
	public Mentorizado registrar(Mentorizado obj) {
		 
		return repo.save(obj);		
	}
	
	@Override
	public Mentorizado leerPorId(Integer id) {
		return repo.findOne(id);
	}

	@Override
	public void eliminar(Integer id) {
		repo.delete(id);
	}


	@Override
	public List<Mentorizado> listar() { 
		return repo.findAll();
	}

	
}
