package com.crm.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.crm.model.Mentor;
import com.crm.model.Mentorizado;
import com.crm.service.IMentorizadoService;

@RestController
@RequestMapping("/mentorizado")
public class MentorizadoController {

	@Autowired
	private IMentorizadoService service;
	
	@GetMapping	
	public ResponseEntity<List<Mentorizado>> listar(){
		List<Mentorizado> lista = service.listar();
		return new ResponseEntity<List<Mentorizado>>(lista, HttpStatus.OK);
	}



	@PostMapping
	public ResponseEntity<Object> registrar(@Valid @RequestBody Mentorizado obj) {
		Mentorizado mentor = service.registrarTransaccional(obj);
	 
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(mentor.getIdMentorizado()).toUri();
		return ResponseEntity.created(location).build();
	}

	 

	@PostMapping("/buscar")
	public ResponseEntity<List<Mentorizado>> buscar(@RequestBody Mentorizado filtro) {
		List<Mentorizado> mentores = new ArrayList<>();
		mentores = service.buscar(filtro);
	 	
		return new ResponseEntity<List<Mentorizado>>(mentores, HttpStatus.OK);
	}
}
