package com.crm.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.crm.exception.ModelNotFoundException;
import com.crm.model.Consulta;
import com.crm.service.IConsultaService;

@RestController
@RequestMapping("/consultas")
public class ConsultaController {

	@Autowired
	private IConsultaService service;
	
 
	@GetMapping
	public ResponseEntity<List<Consulta>> listar() {
		List<Consulta> lista = service.listar();
		return new ResponseEntity<List<Consulta>>(lista, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Consulta> leerPorId(@PathVariable("id") Integer id) {
		Consulta obj = service.leerPorId(id);
		if (obj == null) {
			throw new ModelNotFoundException("ID NO ENCONTRADO: " + id);
		}
		return new ResponseEntity<Consulta>(obj, HttpStatus.OK);
	}

	@GetMapping("/hateoas/{id}")
	public Resource<Consulta> leerPorIdHateoas(@PathVariable("id") Integer id) {
		Consulta obj = service.leerPorId(id);
		if (obj == null) {
			throw new ModelNotFoundException("ID NO ENCONTRADO: " + id);
		}

		Resource<Consulta> resource = new Resource<Consulta>(obj);
		// localhost:8080/pacientes/{id}
		ControllerLinkBuilder linkTo = linkTo(methodOn(this.getClass()).leerPorId(id));
		resource.add(linkTo.withRel("consulta-resource"));
		return resource;

	}
/*
	@GetMapping(value = "/hateoas", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<ConsultaDTO> listarHateoas() {
		List<Consulta> consultas = new ArrayList<>();
		List<ConsultaDTO> consultasDTO = new ArrayList<>();
		consultas = service.listar();

		for (Consulta c : consultas) {
			ConsultaDTO d = new ConsultaDTO();
			d.setIdConsulta(c.getIdConsulta());
		 
			// localhost:8080/consultas/1
			ControllerLinkBuilder linkTo = linkTo(methodOn(ConsultaController.class).leerPorId((c.getIdConsulta())));
			d.add(linkTo.withSelfRel());
			consultasDTO.add(d);

			// pacientes/2
			ControllerLinkBuilder linkTo1 = linkTo(
					methodOn(PacienteController.class).leerPorId((c.getPaciente().getIdPaciente())));
			d.add(linkTo1.withSelfRel());
			consultasDTO.add(d);

			ControllerLinkBuilder linkTo2 = linkTo(
					methodOn(MedicoController.class).leerPorId((c.getMedico().getIdMedico())));
			d.add(linkTo2.withSelfRel());

			consultasDTO.add(d);
		}

		return consultasDTO;
	}
*/
	@PostMapping
	public ResponseEntity<Object> registrar(@Valid @RequestBody Consulta obj) {
		Consulta paciente = service.registrarTransaccional(obj);
 		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(paciente.getIdConsulta()).toUri();
		return ResponseEntity.created(location).build();
	}

	@PutMapping
	public ResponseEntity<Object> modificar(@Valid @RequestBody Consulta pac) {
		service.modificar(pac);
		return new ResponseEntity<Object>(HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Object> eliminar(@PathVariable("id") Integer id) {
		Consulta obj = service.leerPorId(id);
		if (obj == null) {
			throw new ModelNotFoundException("ID NO ENCONTRADO: " + id);
		} else {
			service.eliminar(id);
		}
		return new ResponseEntity<Object>(obj, HttpStatus.OK);
	}

 
	 
	  
	
}
