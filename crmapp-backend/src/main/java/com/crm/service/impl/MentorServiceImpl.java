package com.crm.service.impl;

import java.io.File;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.crm.model.Consulta;
import com.crm.model.Mentor;
import com.crm.repo.IConsultaRepo;
import com.crm.repo.IMentorRepo;
import com.crm.service.IConsultaService;
import com.crm.service.IMentorService;

import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service
public class MentorServiceImpl implements IMentorService{

	@Autowired	
	private IMentorRepo repo;
	
 
	
	@Transactional
	@Override
	public Mentor registrarTransaccional(Mentor mentor) {
  		
 		return repo.save(mentor);
	}

	
	
	@Override
	public List<Mentor> buscar(Mentor filtro) {		
		return repo.buscar(filtro.getNombres());
	}
	
	 
	@Override
	public Mentor modificar(Mentor obj) {
		return repo.save(obj);
	}


	@Override
	public Mentor registrar(Mentor obj) {
		 
		return repo.save(obj);		
	}
	
	@Override
	public Mentor leerPorId(Integer id) {
		return repo.findOne(id);
	}

	@Override
	public void eliminar(Integer id) {
		repo.delete(id);
	}


	@Override
	public List<Mentor> listar() { 
		return repo.findAll();
	}

	
}
