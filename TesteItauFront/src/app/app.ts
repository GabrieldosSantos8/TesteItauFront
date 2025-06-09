import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { NgClass, NgIf, NgFor, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgClass, NgIf, NgFor, JsonPipe, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected title = 'TesteItauFront';
  tabs = [
    { label: 'Consultas' },
    { label: 'Ativos' },
    { label: 'Cotações' },
    { label: 'Operações' },
    { label: 'Posições' },
    { label: 'Usuários' }
  ];
  activeTab = 0;
  ativos: any[] = [];
  cotacoes: any[] = [];
  operacoes: any[] = [];
  posicoes: any[] = [];
  usuarios: any[] = [];

  consulta = {
    ativo: '',
    usuario: '',
    cliente: '',
    resultadoUltimaCotacao: null as any,
    resultadoPrecoMedio: null as any,
    resultadoPosicao: null as any,
    resultadoFinanceiroCorretora: null as any,
    resultadoTop10Posicoes: [] as any[],
    resultadoTop10Corretagem: [] as any[]
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.http.get<any>('http://localhost:5000/api/ativos/ObterTodos').subscribe({
      next: data => this.ativos = Array.isArray(data) ? data : (data?.data || data || []),
      error: () => this.ativos = []
    });
    this.http.get<any>('http://localhost:5000/api/cotacoes/ObterTodos').subscribe({
      next: data => this.cotacoes = Array.isArray(data) ? data : (data?.data || data || []),
      error: () => this.cotacoes = []
    });
    this.http.get<any>('http://localhost:5000/api/operacoes/ObterTodos').subscribe({
      next: data => this.operacoes = Array.isArray(data) ? data : (data?.data || data || []),
      error: () => this.operacoes = []
    });
    this.http.get<any>('http://localhost:5000/api/posicoes/ObterTodos').subscribe({
      next: data => this.posicoes = Array.isArray(data) ? data : (data?.data || data || []),
      error: () => this.posicoes = []
    });
    this.http.get<any>('http://localhost:5000/api/usuarios/ObterTodos').subscribe({
      next: data => this.usuarios = Array.isArray(data) ? data : (data?.data || data || []),
      error: () => this.usuarios = []
    });
  }

  getColumns(arr: any[]): string[] {
    if (!arr || arr.length === 0) return [];
    // Filtra colunas para mostrar apenas primitivos (string, number, boolean)
    return Object.keys(arr[0]).filter(
      key => arr.some(item => item[key] !== null && (typeof item[key] === 'string' || typeof item[key] === 'number' || typeof item[key] === 'boolean'))
    );
  }

  consultarUltimaCotacao() {
    if (!this.consulta.ativo) return;
    this.http.get<any>(`http://localhost:5000/api/ativos/UltimaCotacao/${this.consulta.ativo}`).subscribe({
      next: data => this.consulta.resultadoUltimaCotacao = data,
      error: () => this.consulta.resultadoUltimaCotacao = 'Erro ao consultar.'
    });
  }

  consultarPrecoMedio() {
    if (!this.consulta.usuario || !this.consulta.ativo) return;
    this.http.get<any>(`http://localhost:5000/api/ativos/PrecoMedioPorAtivo/${this.consulta.usuario}/${this.consulta.ativo}`).subscribe({
      next: data => this.consulta.resultadoPrecoMedio = data,
      error: () => this.consulta.resultadoPrecoMedio = 'Erro ao consultar.'
    });
  }

  consultarPosicao() {
    if (!this.consulta.usuario) return;
    this.http.get<any>(`http://localhost:5000/api/ativos/PosicaoCliente/${this.consulta.usuario}`).subscribe({
      next: data => this.consulta.resultadoPosicao = data,
      error: () => this.consulta.resultadoPosicao = 'Erro ao consultar.'
    });
  }

  consultarFinanceiroCorretora() {
    this.http.get<any>(`http://localhost:5000/api/ativos/ValorTotalCorretagem`).subscribe({
      next: data => this.consulta.resultadoFinanceiroCorretora = data,
      error: () => this.consulta.resultadoFinanceiroCorretora = 'Erro ao consultar.'
    });
  }

  consultarTop10() {
    this.http.get<any[]>(`http://localhost:5000/api/ativos/Top10ClientesMaiorPosicao`).subscribe({
      next: data => this.consulta.resultadoTop10Posicoes = data,
      error: () => this.consulta.resultadoTop10Posicoes = []
    });
    this.http.get<any[]>(`http://localhost:5000/api/ativos/Top10ClientesMaisCorretagem`).subscribe({
      next: data => this.consulta.resultadoTop10Corretagem = data,
      error: () => this.consulta.resultadoTop10Corretagem = []
    });
  }
}
