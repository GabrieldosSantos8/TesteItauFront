import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, TesteItauFront');
  });
});

describe('AppComponent', () => {
  let component: App;
  let httpMock: any;

  beforeEach(() => {
    httpMock = {
      get: jasmine.createSpy('get')
    };
    component = new App(httpMock);
  });

  it('deve carregar ativos corretamente', () => {
    const mockAtivos = [
      { pkAtivo: 1, dsCodigo: 'PETR4', dsNome: 'Petrobras PN' },
      { pkAtivo: 2, dsCodigo: 'VALE3', dsNome: 'Vale ON' }
    ];
    httpMock.get.and.returnValue({ subscribe: (cb: any) => cb.next(mockAtivos) });
    component.loadAll();
    expect(component.ativos).toEqual(mockAtivos);
  });

  it('deve carregar listas vazias quando o backend retorna vazio', () => {
    httpMock.get.and.returnValue({ subscribe: (cb: any) => cb.next([]) });
    component.loadAll();
    expect(component.ativos).toEqual([]);
    expect(component.cotacoes).toEqual([]);
    expect(component.operacoes).toEqual([]);
    expect(component.posicoes).toEqual([]);
    expect(component.usuarios).toEqual([]);
  });

  it('deve tratar erro e definir listas como vazias', () => {
    httpMock.get.and.returnValue({ subscribe: (cb: any) => cb.error() });
    component.loadAll();
    expect(component.ativos).toEqual([]);
    expect(component.cotacoes).toEqual([]);
    expect(component.operacoes).toEqual([]);
    expect(component.posicoes).toEqual([]);
    expect(component.usuarios).toEqual([]);
  });

  it('getColumns deve retornar apenas colunas primitivas', () => {
    const arr = [
      { a: 1, b: 'x', c: null, d: { foo: 1 }, e: [1,2] },
      { a: 2, b: 'y', c: null, d: null, e: null }
    ];
    expect(component.getColumns(arr)).toEqual(['a', 'b']);
  });

  it('getColumns deve retornar lista vazia para array vazio', () => {
    expect(component.getColumns([])).toEqual([]);
  });
});
