export const mockClientData = {
  success: true,
  message: "Clients returned succesful",
  clients: [
    {
      clientId: "SJpP3Vl3+KffPgrjjcU/Kw==",
      name: "dGyGMKCr5e3hSdYqn7342FEB+PBkfGFjF4BYWg/9Dow=",
      shortName: "2SLdxd0rlGYEwVobnSDYtw==",
      id: "xKsfST1p6nz7+D6Z1neCdQ==",
      personalPhoneNumber: "/5ymDgyKQ8AYNftkAklEvg==",
      homePhoneNumber: "jb/R1ifddU1YAeWb7Vt6Mw==",
      workPhoneNumber: "ztKTAE0+PDfq4OxL5dyiWQ==",
      workPhoneNumber2: "jb/R1ifddU1YAeWb7Vt6Mw==",
      jobPosition: "H2FFdMsbwO/wR6HmTU1ZBw==",
      addressLevel1: "TL8cRNt/IxM+HdH14zVR+A==",
      addressLevel2: "PTSDruFeHyoK3jk8ILpRTA==",
      address:
        "x6P05i5Ez5Dd5XtoJ47DirRc/zBlMCx+XprnywhaQMcgUCCCoUAFqklLZus6mXmrkApaG22lpLeD7rlJhs5r3A==",
      civilStatus: "5yXpwH/T++DLnvVvDb9VKA==",
      cycle: 7,
      status: 1,
      portfolio: "NKcKxFxZx26jhZcumvdo1g==",
      portfolioId: "GF/OPOfvf0m5lRWh2LSm/A==",
      operations: [
        {
          operationId: "+LEIxKfLl87ht11RxvqEnQ==",
          description: "R8opS+tVQtjEKLOEzaeB3nj6gi2qSDzS8l2uYtUo/5Q=",
          productCode: "tV4N4SITJUN5/z1qIXQPYA==",
          lastPaymentDate: "zrR3Zfxj+TGxDUZjmKLHjw==",
          operationType: "T5nM/3w0zGY+X3ZY1oy1Mg==",
          overdueDays: 22,
          minimumPayment: 400.71,
          overdueBalance: 400.71,
          totalBalance: 400.71,
          cycle: 7,
          currencyISO: 320,
          currency: "Quetzales",
          currencyCode: "320",
          currencySymbol: "Q",
          clientId: "SJpP3Vl3+KffPgrjjcU/Kw==",
          overduePayments: 1,
          nextPaymentDate: "07-03-2024",
          lastPaymentAmount: 0,
          outstanding: 0,
          portfolio: "NKcKxFxZx26jhZcumvdo1g==",
        },
      ],
      managements: [
        {
          id: "exL7A9AG+72S1gxY979SkA==",
          dateManagement: "YaM9Tg5v2NqdkQdgJO718A==",
          action: "UbneA+7L72dRKotiXRPTX25ldHDqx2egqC9BI5Lfxqs=",
          result: "e+m2zDzyxgo8C2ZY3IKFMM1JY5YESWbYfkEaWaCBdwA=",
          comment: "0YVuBBobqDwDYr2UxQUo2g==",
          manager: "Iwjk38auzq1QPGJlWQhO0Za0/GxsIdMgDYZDJTIA2fs=",
          portfolio: "NKcKxFxZx26jhZcumvdo1g==",
          contactPhone: "lrT8bGwh0yANhkMlMgDZ+w==",
          actionDate: "YaM9Tg5v2NqdkQdgJO718A==",
          reasonDelay: "r3cWOiXYZWnrmTBcYf/6zQUUQD+Hhps1Zqeg2RjC9WI=",
        },
      ],
    },
  ],
  traceId: "6322f1ce-6f9e-4aab-92af-871666050cce",
};

export const actions = [
  { value: "VT", label: "VT - VISITA TRABAJO" },
  { value: "VD", label: "VD - VISITA DOMICILIO" },
  { value: "VR", label: "VR - VISITA REFENCIA" },
];

export const results = [
  { value: "PRP", label: "PRP- PROMESA DE PAGO" },
  { value: "CSP", label: "CSP - CONTACTO SIN PROMESA" },
];

export const reasons = [
  { value: "DES", label: "Desempleado" },
  { value: "ENF", label: "Enfermedad" },
  { value: "ING", label: "Ingresos insuficientes" },
];