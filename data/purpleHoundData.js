// Action 대표 카테고리 리스트
export const actionCategory = [
  ['네트워크 공격 시나리오', 20, {name: 'networkAttack', description: '네트워크 통신 프로토콜을 이용하여 네트워크 장비를 대상으로 하는 공격입니다.' }],
  ['APT 공격 시나리오', 20, {name: 'aptAttack', description: '특정 조직이나 개인을 겨냥한 맞춤형 피싱 공격으로, 신뢰할 수 있는 출처로 위장하여 악성코드를 유포하거나 중요 정보를 탈취합니다.' }], 
  ['취약점 공격 시나리오', 20, {name: 'vulnAttack', description: '프로세스 간 공유되는 메모리 영역을 악의적으로 조작하여 데이터를 탈취하거나 변조하는 공격입니다.' }], 
  ['금융권 대상 공격 시나리오', 20, {name: 'financeAttack', description: '신뢰할 수 있는 소프트웨어 공급업체나 서비스 제공업체를 통해 악성코드를 유포하는 간접적인 공격 방식입니다.' }],
  ['통신 시스템 공격 시나리오', 20, {name: 'telecomAttack', description: '통신사의 시그널링 시스템을 악용하여 통화 도청, 위치 추적, SMS 가로채기 등을 시도하는 공격입니다.' }],
];

// 카테고리별 세부 내용 리스트
export const networkAttack = [
  {
    id: 1,
    name: 'ARP Spoofing 공격',
    description: 'ARP Spoofing은 ARP 프로토콜을 이용하여 네트워크 장비의 MAC 주소를 속여 네트워크 트래픽을 목표 장비로 유하는 공격입니다.'
  },
  {
    id: 2,
    name: 'DNS Spoofing 공격',
    description: 'DNS Spoofing은 DNS 서버의 응답을 가로채거나 위조하여 사용자를 악성 사이트로 유도하는 공격입니다.'
  },
  {
    id: 3,
    name: 'ICMP Flooding 공격',
    description: 'ICMP Flooding 공격은 대량의 ICMP 패킷을 전송하여 네트워크 대역폭과 시스템 자원을 고갈시키는 DoS 공격입니다.'
  },
  {
    id: 4,
    name: 'SYN Flooding 공격',
    description: 'SYN Flooding 공격은 TCP 연결 설정 과정에서 SYN 패킷만을 대량 전송하여 서버를 무한 연결대기 상태로 만들어 서비스를 방해하는 공격입니다.'
  },
  {
    id: 5,
    name: 'UDP Flooding 공격',
    description: 'UDP Flooding 공격은 대량의 UDP 패킷을 무작위 포트로 전송하여 네트워크 대역폭과 시스템 자원을 고갈시키는 DoS 공격입니다.'
  }
];

export const aptAttack = [
  {
    id: 1,
    name: '스피어 피싱(Spear Fishing) 공격',
    description: '특정 조직이나 개인을 겨냥한 맞춤형 피싱 메일을 보내는 공격으로, 신뢰할 수 있는 발신자로 위장하여 악성코드를 전송하거나 중요 정보를 탈취합니다.'
  },
  {
    id: 2,
    name: '워터링홀(Watering Hole) 공격',
    description: '목표 조직의 임직원들이 자주 방문하는 웹사이트를 해킹하여 악성코드를 심어두고, 웹사이트 방문자들을 감염시키는 공격입니다.'
  },
  {
    id: 3,
    name: '제로데이(0-Day) 취약점 공격',
    description: '아직 보안 패치가 공개되지 않은 소프트웨어의 보안 취약점을 이용하여 시스템에 침투하는 고도화된 공격입니다.'
  },
  {
    id: 4,
    name: '공급망(Supply Chain) 공격',
    description: '신뢰할 수 있는 소프트웨어 공급업체나 서비스 제공업체를 통해 악성코드를 유포하는 간접적인 공격 방식입니다.'
  },
  {
    id: 5,
    name: '탐지회피(Defense Evasion) 공격',
    description: '백신 등 보안 프로그램의 탐지를 피해 장기간에 걸쳐 은밀하게 시스템에 잠복하면서 정보를 수집하고 유출하는 지능형 공격입니다.'
  }
];

export const vulnAttack = [
  {
    id: 1,
    name: '공유 메모리 조작',
    description: '프로세스 간 공유되는 메모리 영역을 악의적으로 조작하여 데이터를 탈취하거나 변조하는 공격입니다.'
  },
  {
    id: 2,
    name: '파이프 하이재킹(Pipe Hijacking)',
    description: '프로세스 간 통신에 사용되는 파이프를 가로채어 데이터를 도청하거나 변조하는 공격입니다.'
  },
  {
    id: 3,
    name: '힙 오버플로우(Heap Overflow) 공격',
    description: '힙 메모리에 과도한 데이터를 삽입하여 시스템 자원을 고갈시키거나 버퍼 오버플로우를 유발하는 공격입니다.'
  },
  {
    id: 4,
    name: '레이스컨디션(Race Condition) 공격',
    description: '프로세스 간 동기화에 사용되는 세마포어를 조작하여 의도적으로 교착상태를 발생시키는 공격입니다.'
  },
  {
    id: 5,
    name: 'RPC 취약점 공격',
    description: '원격 프로시저를 호출하는 절차에서 발생하는 취약점을 이용하여 원격으로 임의 코드를 실행하는 공격입니다.'
  }
];

export const financeAttack = [
  {
    id: 1,
    name: '계정 탈취 공격',
    description: '사회공학적 방법이나 악성코드를 통해 금융 계정 정보를 탈취하여 불법 이체나 거래를 시도하는 공격입니다.'
  },
  {
    id: 2,
    name: '거래 변조 공격',
    description: '정상적인 금융 거래 과정에 개입하여 거래 정보를 변조함으로써 자금을 탈취하는 공격입니다.'
  },
  {
    id: 3,
    name: '인증 우회 공격',
    description: '이중 인증이나 보안카드 등의 금융 보안 장치를 우회하여 불법적인 거래를 시도하는 공격입니다.'
  },
  {
    id: 4,
    name: '금융 앱 변조',
    description: '정상적인 금융 앱을 변조하여 사용자의 금융 정보를 탈취하거나 거래를 조작하는 공격입니다.'
  },
  {
    id: 5,
    name: 'ATM 스키밍(Skimming)',
    description: 'ATM기기에 물리적인 장치를 설치하여 카드 정보와 비밀번호를 탈취하는 공격입니다.'
  }
];

export const telecomAttack = [
  {
    id: 1,
    name: 'SS7 프로토콜 공격',
    description: '통신사의 시그널링 시스템을 악용하여 통화 도청, 위치 추적, SMS 가로채기 등을 시도하는 공격입니다.'
  },
  {
    id: 2,
    name: 'SIM 스와핑',
    description: '사회공학적 방법으로 통신사 직원을 속여 타인의 전화번호를 탈취하는 공격입니다.'
  },
  {
    id: 3,
    name: '통신망 DDoS',
    description: '통신사의 네트워크 인프라를 대상으로 대규모 트래픽을 발생시켜 서비스를 마비시키는 공격입니다.'
  },
  {
    id: 4,
    name: '기지국 Spoofing',
    description: '가짜 기지국을 설치하여 모바일 기기의 통신을 가로채거나 조작하는 공격입니다.'
  },
  {
    id: 5,
    name: 'VoLTE 취약점 공격',
    description: 'VoLTE 서비스의 취약점을 이용하여 무료 통화나 데이터 사용, 통화 도청 등을 시도하는 공격입니다.'
  }
];