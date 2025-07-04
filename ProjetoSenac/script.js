const perguntas = [
  {
    texto: "O que você mais gosta de fazer?",
    opcoes: [
      { texto: "Mexer com computadores e tecnologia", valor: ["Redes", "Programador Web", "Informática Básica"] },
      { texto: "Cuidar de pessoas", valor: ["Enfermagem", "Radiologia"] },
      { texto: "Organizar documentos e tarefas", valor: ["Assistente Administrativo"] },
      { texto: "Trabalhar com estética e aparência", valor: ["Beleza"] }
    ]
  },
  {
    texto: "Em qual ambiente você se sente mais confortável?",
    opcoes: [
      { texto: "Laboratório de informática", valor: ["Informática Básica", "Programador Web", "Redes"] },
      { texto: "Escritório com planilhas e documentos", valor: ["Assistente Administrativo"] },
      { texto: "Salão de beleza", valor: ["Beleza"] },
      { texto: "Cozinha ou restaurante", valor: ["Gastronomia"] }
    ]
  },
  {
    texto: "Qual destas tarefas você executaria com mais prazer?",
    opcoes: [
      { texto: "Instalar e configurar roteadores e redes", valor: ["Redes"] },
      { texto: "Criar um site ou aplicativo", valor: ["Programador Web"] },
      { texto: "Organizar um evento ou planilhas", valor: ["Assistente Administrativo"] },
      { texto: "Cuidar de um paciente", valor: ["Enfermagem"] }
    ]
  },
  {
    texto: "Você se considera uma pessoa...",
    opcoes: [
      { texto: "Analítica e lógica", valor: ["Redes", "Programador Web"] },
      { texto: "Comunicativa e prestativa", valor: ["Enfermagem", "Beleza"] },
      { texto: "Detalhista e organizada", valor: ["Assistente Administrativo", "Radiologia"] },
      { texto: "Criativa e manual", valor: ["Beleza", "Gastronomia"] }
    ]
  },
  {
    texto: "Com qual situação você mais se identifica?",
    opcoes: [
      { texto: "Ajudar alguém a usar o computador", valor: ["Informática Básica", "Programador Web"] },
      { texto: "Preparar uma refeição para amigos ou família", valor: ["Gastronomia"] },
      { texto: "Atender pessoas e organizar tarefas", valor: ["Assistente Administrativo"] },
      { texto: "Ajudar a cuidar da saúde de alguém", valor: ["Enfermagem", "Radiologia"] }
    ]
  },
  {
    texto: "Em uma situação de grupo, você tende a:",
    opcoes: [
      { texto: "Resolver problemas técnicos", valor: ["Redes", "Programador Web"] },
      { texto: "Assumir o controle da organização", valor: ["Assistente Administrativo"] },
      { texto: "Cuidar do bem-estar das pessoas", valor: ["Enfermagem", "Beleza"] },
      { texto: "Trazer ideias criativas", valor: ["Gastronomia", "Beleza"] }
    ]
  },
  {
    texto: "Você prefere atividades que envolvem:",
    opcoes: [
      { texto: "Computador e tecnologia", valor: ["Informática Básica", "Programador Web", "Redes"] },
      { texto: "Contato direto com o público", valor: ["Beleza", "Enfermagem"] },
      { texto: "Organização de tarefas e planejamento", valor: ["Assistente Administrativo"] },
      { texto: "Procedimentos técnicos com equipamentos", valor: ["Radiologia", "Redes"] }
    ]
  },
  {
    texto: "Qual dessas frases mais combina com você?",
    opcoes: [
      { texto: "Adoro resolver problemas com lógica.", valor: ["Programador Web", "Redes"] },
      { texto: "Gosto de deixar as pessoas mais bonitas.", valor: ["Beleza"] },
      { texto: "Tenho interesse em ajudar no cuidado com a saúde.", valor: ["Enfermagem", "Radiologia"] },
      { texto: "Sinto prazer em cozinhar para outras pessoas.", valor: ["Gastronomia"] }
    ]
  },
  {
    texto: "Qual habilidade você gostaria de desenvolver?",
    opcoes: [
      { texto: "Criar sistemas ou sites", valor: ["Programador Web"] },
      { texto: "Atender clientes e lidar com papéis", valor: ["Assistente Administrativo"] },
      { texto: "Aplicar técnicas de estética", valor: ["Beleza"] },
      { texto: "Preparar pratos profissionais", valor: ["Gastronomia"] }
    ]
  },
  {
    texto: "Se você tivesse que escolher uma aula para assistir agora, qual seria?",
    opcoes: [
      { texto: "Introdução à Internet e Windows", valor: ["Informática Básica"] },
      { texto: "Noções de primeiros socorros", valor: ["Enfermagem"] },
      { texto: "Técnicas de cozinha profissional", valor: ["Gastronomia"] },
      { texto: "Como montar uma rede de computadores", valor: ["Redes"] }
    ]
  }
];

let respostas = [];
let perguntaAtual = 0;

const quizContainer = document.getElementById("quizContainer");
const btnProximo = document.getElementById("nextBtn");
const btnAnterior = document.getElementById("prevBtn");
const resultado = document.getElementById("resultado");
const progressBar = document.getElementById("progress");

function mostrarPergunta() {
  const pergunta = perguntas[perguntaAtual];
  quizContainer.innerHTML = `
    <div class="question">${pergunta.texto}</div>
    <div class="options">
      ${pergunta.opcoes.map((opcao, index) => `
        <label class="${respostas[perguntaAtual] === index ? 'selected' : ''}">
          <input type="radio" name="pergunta" value="${index}" ${respostas[perguntaAtual] === index ? 'checked' : ''}>
          ${opcao.texto}
        </label>
      `).join("")}
    </div>
  `;

  atualizarProgresso();

  document.querySelectorAll('input[name="pergunta"]').forEach(input => {
    input.addEventListener('change', () => {
      respostas[perguntaAtual] = parseInt(input.value);
      document.querySelectorAll('.options label').forEach(label => label.classList.remove('selected'));
      input.parentElement.classList.add('selected');
    });
  });

  btnAnterior.disabled = perguntaAtual === 0;
  btnProximo.textContent = perguntaAtual === perguntas.length - 1 ? "Ver Resultado" : "Próximo";
}

function atualizarProgresso() {
  const progresso = ((perguntaAtual) / perguntas.length) * 100;
  progressBar.style.width = `${progresso}%`;
}

function computarResultado() {
  const pontuacao = {
    "Redes": 0,
    "Informática Básica": 0,
    "Programador Web": 0,
    "Assistente Administrativo": 0,
    "Beleza": 0,
    "Gastronomia": 0,
    "Enfermagem": 0,
    "Radiologia": 0
  };

  respostas.forEach((resposta, i) => {
    const cursos = perguntas[i].opcoes[resposta].valor;
    cursos.forEach(curso => {
      pontuacao[curso]++;
    });
  });

  const cursoSugerido = Object.keys(pontuacao).reduce((a, b) => pontuacao[a] > pontuacao[b] ? a : b);

  document.getElementById("resultadoTexto").innerHTML = `🔎 Com base nas suas respostas, o curso mais indicado é: <strong>${cursoSugerido}</strong>`;
  resultado.style.display = "block";
  quizContainer.style.display = "none";
  btnAnterior.style.display = "none";
  btnProximo.style.display = "none";
  progressBar.style.width = "100%";
}

btnProximo.addEventListener("click", () => {
  const selecionada = document.querySelector('input[name="pergunta"]:checked');
  if (!selecionada) {
    alert("Por favor, selecione uma opção.");
    return;
  }

  respostas[perguntaAtual] = parseInt(selecionada.value);

  if (perguntaAtual === perguntas.length - 1) {
    computarResultado();
  } else {
    perguntaAtual++;
    mostrarPergunta();
  }
});

btnAnterior.addEventListener("click", () => {
  if (perguntaAtual > 0) {
    perguntaAtual--;
    mostrarPergunta();
  }
});

mostrarPergunta();
function iniciarTeste() {
  const nome = document.getElementById("nome").value.trim();
  const contato = document.getElementById("contato").value.trim();

  if (!nome || !contato) {
    alert("Por favor, preencha seu nome e contato para iniciar o teste.");
    return;
  }

  document.getElementById("telaInicial").style.display = "none";
  document.querySelector("main").style.display = "block";
  mostrarPergunta();
}

function reiniciarTeste() {
  respostas = [];
  perguntaAtual = 0;
  resultado.style.display = "none";
  document.getElementById("resultadoTexto").innerHTML = "";
  document.querySelector("main").style.display = "none";
  document.getElementById("telaInicial").style.display = "block";
  progressBar.style.width = "0%";
}
