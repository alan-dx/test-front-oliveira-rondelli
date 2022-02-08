import { api } from '../services/api';

export interface FetchPlansParams {
  id?: number;//nivelSuperior
  identificacao?: string;
  tipo?: string;
  orderByDescending?: boolean;
  page?: number
}

export async function fetchPlans({ 
  id = null, 
  identificacao = null, 
  tipo = null, 
  orderByDescending = false,
  page = 1
}: FetchPlansParams) {
  // const son = plans.data.find(plan => plan.parentPlanoConta?.id === id)
  // // console.log(son)
  // getPlans()
  // const son2 = plans.data.filter(plan => plan.parentPlanoConta?.id === id) 
  console.log(id, identificacao, tipo, orderByDescending, page)
  return api.get(`/planocontas`, {
    params: {
      nivelSuperior: id,
      identificacao,
      tipo,
      orderByDescending,
      page,
    }
  })
  // }).then((response) => {
  //   //retorna sempre os itens com parentPlanoContas = null
  //   console.log(response.data)
  //   //fazer essa parte da filtragem de forma independente em cada chamada
  //   //o erro do clearFilter é por causa do id passado aq
  //   const plans = response.data.data.filter(plan => plan.parentPlanoConta?.id === id)
  //   console.log(plans)
  //   return plans
  // })

  // if (son2) {
  //   return son2.map((son) => (
  //     <Accordion 
  //       key={son.id}
  //       title={`${son.id.toString().split("").join(".")} (${son.identificacao})`} 
  //       findYourSon={() => findChildrenOfPlans(son.id)} 
  //     />
  //   )) 
  // }

  // return null
}