export type FirstEnterInfosPageProps = {
  title: string;
  description: string;
  image: any;
};
export const FirstEnterInfosPage = [
  {
    Tipo: "Pessoa",
    Info: <FirstEnterInfosPageProps[]>[
      {
        title: "Questionários de autoavaliação",
        description:
          "Oferecemos uma variedade de questionários para ajudá-lo(a) a entender melhor seus sentimentos e emoções. No entanto, é importante ressaltar que esses questionários não substituem a avaliação de um profissional de saúde mental. Eles são destinados a fornecer insights iniciais e encorajar a procurar ajuda se necessário.",
        image: require("@/assets/images/image0.png"),
      },
      {
        title: "Cuidado profissional",
        description:
          "Se você estiver enfrentando desafios emocionais ou mentais significativos, recomendamos fortemente que você busque ajuda de um profissional de saúde mental qualificado. Eles podem oferecer avaliação, diagnóstico e suporte personalizado para suas necessidades específicas.",
        image: require("@/assets/images/image1.png"),
      },
      {
        title: "Autocuidado consciente",
        description:
          "Este aplicativo é uma ferramenta para ajudá-lo(a) a ser mais consciente de sua saúde mental e promover o autocuidado. Utilize-o como uma parte de sua rotina de bem-estar, mas lembre-se de que é apenas uma parte do quadro geral. O autocuidado inclui também hábitos saudáveis de sono, exercícios, alimentação balanceada e conexões sociais.",
        image: require("@/assets/images/image2.png"),
      },
    ],
  },
  {
    Tipo: "Profissional",
    Info: <FirstEnterInfosPageProps[]>[
      {
        title: "Introdução ao MindCheck",
        description:
          "Nosso objetivo é fornecer ferramentas de avaliação que auxiliem na compreensão de aspectos psicológicos importantes dos seus pacientes. Este aplicativo foi desenvolvido para ser uma extensão do seu trabalho clínico, oferecendo testes padronizados que podem ser utilizados como parte do processo de avaliação.",
        image: require("@/assets/images/image0.png"),
      },
      {
        title: "Cuidado profissional",
        description:
          "Os testes disponíveis no aplicativo são projetados para fornecer uma visão preliminar dos aspectos psicológicos dos pacientes. Eles não substituem uma avaliação clínica completa e detalhada realizada por um profissional de saúde mental qualificado. ",
        image: require("@/assets/images/image1.png"),
      },
      {
        title: "Uso ético e responsável",
        description:
          "Incentivamos o uso ético e responsável do aplicativo. Certifique-se de que os pacientes compreendam que os testes são apenas uma parte do processo de avaliação e que eles devem buscar acompanhamento contínuo com um profissional de saúde mental.",
        image: require("@/assets/images/image2.png"),
      },
    ],
  },
];
