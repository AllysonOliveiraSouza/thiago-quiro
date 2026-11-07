/* ==========================================================================
   SCRIPT DE INTERATIVIDADE DA PÁGINA
   Tudo comentado em português para facilitar qualquer alteração futura!
   ========================================================================== */

// CONFIGURAÇÃO DO WHATSAPP:
// Coloque aqui o número do WhatsApp com código do país (55) e DDD, apenas números.
const NUMERO_WHATSAPP = "5511999999999";

document.addEventListener("DOMContentLoaded", function () {

    /* ----------------------------------------------------------------------
       1. MENU MOBILE (ABRIR E FECHAR NO CELULAR)
       ---------------------------------------------------------------------- */
    const botaoMenuMobile = document.getElementById("botao-menu-mobile");
    const menuNavegacao = document.getElementById("menu-navegacao");
    const linksDoMenu = document.querySelectorAll(".menu-link, .botao-menu");

    if (botaoMenuMobile && menuNavegacao) {
        // Abre ou fecha o menu ao clicar no ícone hambúrguer
        botaoMenuMobile.addEventListener("click", function () {
            menuNavegacao.classList.toggle("aberto");
        });

        // Fecha o menu automaticamente quando o usuário clica em algum link
        linksDoMenu.forEach(function (link) {
            link.addEventListener("click", function () {
                menuNavegacao.classList.remove("aberto");
            });
        });
    }

    /* ----------------------------------------------------------------------
       2. EFEITO DE SOMBRA NO CABEÇALHO AO ROLAR A PÁGINA
       ---------------------------------------------------------------------- */
    const cabecalho = document.getElementById("cabecalho");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 20) {
            cabecalho.classList.add("rolagem-ativa");
        } else {
            cabecalho.classList.remove("rolagem-ativa");
        }
    });

    /* ----------------------------------------------------------------------
       3. PERGUNTAS FREQUENTES (EFEITO ACORDEÃO / SANFONA)
       ---------------------------------------------------------------------- */
    const itensFaq = document.querySelectorAll(".faq-item");

    itensFaq.forEach(function (item) {
        const botaoPergunta = item.querySelector(".faq-pergunta");
        const caixaResposta = item.querySelector(".faq-resposta");

        botaoPergunta.addEventListener("click", function () {
            const estaAtivo = item.classList.contains("ativo");

            // Primeiro, fecha todas as outras perguntas abertas
            itensFaq.forEach(function (outroItem) {
                outroItem.classList.remove("ativo");
                outroItem.querySelector(".faq-resposta").style.maxHeight = null;
                outroItem.querySelector(".faq-pergunta").setAttribute("aria-expanded", "false");
            });

            // Se a pergunta clicada não estava aberta, abre ela agora
            if (!estaAtivo) {
                item.classList.add("ativo");
                caixaResposta.style.maxHeight = caixaResposta.scrollHeight + "px";
                botaoPergunta.setAttribute("aria-expanded", "true");
            }
        });
    });

    /* ----------------------------------------------------------------------
       4. ENVIO DO FORMULÁRIO DIRETO PARA O WHATSAPP
       ---------------------------------------------------------------------- */
    const formulario = document.getElementById("formulario-agendamento");

    if (formulario) {
        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault(); // Evita que a página recarregue

            // Captura os valores digitados pelo paciente
            const nome = document.getElementById("nome").value.trim();
            const telefone = document.getElementById("telefone").value.trim();
            const motivo = document.getElementById("motivo").value;
            const periodo = document.getElementById("periodo").value;

            // Monta a mensagem organizada para o WhatsApp
            const mensagem = 
                `Olá, Thiago! Gostaria de agendar uma consulta de Quiropraxia.\n\n` +
                `*Nome:* ${nome}\n` +
                `*Telefone:* ${telefone}\n` +
                `*Motivo principal:* ${motivo}\n` +
                `*Preferência de horário:* ${periodo}`;

            // Codifica o texto para formato de link e abre o WhatsApp
            const urlWhatsapp = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
            window.open(urlWhatsapp, "_blank");
        });
    }

    /* ----------------------------------------------------------------------
       5. ATUALIZA O ANO AUTOMATICAMENTE NO RODAPÉ
       ---------------------------------------------------------------------- */
    const elementoAno = document.getElementById("ano-atual");
    if (elementoAno) {
        elementoAno.textContent = new Date().getFullYear();
    }
});
