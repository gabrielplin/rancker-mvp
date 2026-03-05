export type RootCauseOption = {
  label: string;
  value: string;
  checkboxes: {
    label: string;
    value: string;
  }[];
};

export type CauseGrandchild = {
  label: string;
  value: string;
};

export type CauseChild = {
  label: string;
  value: string;
  children?: CauseGrandchild[];
};

export type RootCause = {
  label: string;
  value: string;
  children: CauseChild[];
};

export const ROOT_CAUSES: RootCause[] = [
  {
    label: 'Construtora - Desenvolvimento - Brinde ou Gentileza para cliente',
    value: 'construtora_brinde_cliente',
    children: [
      {
        label: 'Ajuste comercial',
        value: 'ajuste_comercial',
        children: [
          { label: 'Upgrade de acabamento', value: 'upgrade_acabamento' },
          { label: 'Material superior ao vendido', value: 'material_superior' }
        ]
      },
      {
        label: 'Cortesia pós-venda',
        value: 'cortesia_pos_venda',
        children: [
          { label: 'Item adicional solicitado', value: 'item_adicional' },
          { label: 'Melhoria estética', value: 'melhoria_estetica' }
        ]
      }
    ]
  },

  {
    label: 'DNN - Erro de especificação / Premissa / Não vendido',
    value: 'dnn_erro_especificacao',
    children: [
      {
        label: 'Premissa incorreta',
        value: 'premissa_incorreta',
        children: [
          { label: 'Material incorreto', value: 'material_incorreto' },
          { label: 'Dimensão incorreta', value: 'dimensao_incorreta' }
        ]
      },
      {
        label: 'Item não vendido',
        value: 'item_nao_vendido',
        children: [
          { label: 'Escopo incompleto', value: 'escopo_incompleto' },
          { label: 'Item esquecido na venda', value: 'item_esquecido_venda' }
        ]
      }
    ]
  },

  {
    label: 'Arquitetura - Desenvolvimento - Erro de especificação / Premissa',
    value: 'arquitetura_erro_especificacao',
    children: [
      {
        label: 'Especificação técnica incorreta',
        value: 'especificacao_tecnica',
        children: [
          { label: 'Material incorreto', value: 'material_errado' },
          {
            label: 'Detalhe construtivo inadequado',
            value: 'detalhe_inadequado'
          }
        ]
      },
      {
        label: 'Compatibilização falha',
        value: 'compatibilizacao',
        children: [
          { label: 'Estrutural', value: 'compat_estrutural' },
          { label: 'Elétrica', value: 'compat_eletrica' },
          { label: 'Hidráulica', value: 'compat_hidraulica' }
        ]
      }
    ]
  },

  {
    label: 'Supply - Erro de compra - QTDE e Valor',
    value: 'supply_erro_compra',
    children: [
      {
        label: 'Quantidade incorreta',
        value: 'quantidade_incorreta',
        children: [
          { label: 'Compra excedente', value: 'compra_excedente' },
          { label: 'Compra insuficiente', value: 'compra_insuficiente' }
        ]
      },
      {
        label: 'Preço incorreto',
        value: 'preco_incorreto',
        children: [
          { label: 'Erro na cotação', value: 'erro_cotacao' },
          { label: 'Erro na negociação', value: 'erro_negociacao' }
        ]
      }
    ]
  },

  {
    label: 'Obra - Perda ou roubo em obra',
    value: 'obra_perda_roubo',
    children: [
      {
        label: 'Furto',
        value: 'furto',
        children: [
          { label: 'Furto externo', value: 'furto_externo' },
          { label: 'Furto interno', value: 'furto_interno' }
        ]
      },
      {
        label: 'Controle de estoque falho',
        value: 'estoque_falho',
        children: [
          { label: 'Inventário incorreto', value: 'inventario_incorreto' },
          { label: 'Registro de entrada incorreto', value: 'registro_entrada' }
        ]
      }
    ]
  },

  {
    label: 'Obra - Erro execução',
    value: 'obra_erro_execucao',
    children: [
      {
        label: 'Execução fora do projeto',
        value: 'execucao_fora_projeto',
        children: [
          { label: 'Dimensão incorreta', value: 'exec_dimensao' },
          { label: 'Método construtivo incorreto', value: 'metodo_incorreto' }
        ]
      },
      {
        label: 'Falha de supervisão',
        value: 'falha_supervisao',
        children: [
          { label: 'Engenheiro', value: 'erro_engenheiro' },
          { label: 'Mestre de obra', value: 'erro_mestre_obra' }
        ]
      }
    ]
  },

  {
    label: 'Sinistro a ser pago pelo seguro da AW',
    value: 'seguro_aw',
    children: [
      {
        label: 'Dano material',
        value: 'dano_material',
        children: [
          { label: 'Equipamento danificado', value: 'equipamento_danificado' },
          { label: 'Estrutura danificada', value: 'estrutura_danificada' }
        ]
      }
    ]
  }
];
