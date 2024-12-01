// Action 대표 카테고리 리스트
export const actionCategory = [
  {
    title_ko: '네트워크 공격 시나리오',
    title_en: 'Network Attack Scenarios'
  },
  {
    title_ko: 'APT 공격 시나리오',
    title_en: 'APT Attack Scenarios'
  },
  {
    title_ko: '취약점 공격 시나리오',
    title_en: 'Vulnerability Attack Scenarios'
  },
  {
    title_ko: '금융권 대상 공격 시나리오',
    title_en: 'Financial Sector Attack Scenarios'
  }
];

// 카테고리별 세부 내용 리스트
export const networkAttack = [
  {
    id: 1,
    name_ko: 'ARP Spoofing 공격',
    description_ko: 'ARP Spoofing은 ARP 프로토콜을 이용하여 네트워크 장비의 MAC 주소를 속여 네트워크 트래픽을 목표 장비로 유도하는 공격입니다.',
    name_en: 'ARP Spoofing Attack',
    description_en: "ARP Spoofing uses the ARP protocol to deceive network devices' MAC addresses, redirecting network traffic to a target device."
  },
  {
    id: 2,
    name_ko: 'DNS Spoofing 공격',
    description_ko: 'DNS Spoofing은 DNS 서버의 응답을 가로채거나 위조하여 사용자를 악성 사이트로 유도하는 공격입니다.',
    name_en: 'DNS Spoofing Attack',
    description_en: 'DNS Spoofing intercepts or forges DNS server responses to direct users to malicious sites.'
  },
  {
    id: 3,
    name_ko: 'ICMP Flooding 공격',
    description_ko: 'ICMP Flooding 공격은 대량의 ICMP 패킷을 전송하여 네트워크 대역폭과 시스템 자원을 고갈시키는 DoS 공격입니다.',
    name_en: 'ICMP Flooding Attack',
    description_en: 'ICMP Flooding sends a large volume of ICMP packets to exhaust network bandwidth and system resources, resulting in a DoS attack.'
  },
  {
    id: 4,
    name_ko: 'SYN Flooding 공격',
    description_ko: 'SYN Flooding 공격은 TCP 연결 설정 과정에서 SYN 패킷만을 대량 전송하여 서버를 무한 연결대기 상태로 만들어 서비스를 방해하는 공격입니다.',
    name_en: 'SYN Flooding Attack',
    description_en: 'SYN Flooding sends a high volume of SYN packets during the TCP connection setup, causing the server to enter an infinite connection wait state and disrupting services.'
  },
  {
    id: 5,
    name_ko: 'UDP Flooding 공격',
    description_ko: 'UDP Flooding 공격은 대량의 UDP 패킷을 무작위 포트로 전송하여 네트워크 대역폭과 시스템 자원을 고갈시키는 DoS 공격입니다.',
    name_en: 'UDP Flooding Attack',
    description_en: 'UDP Flooding sends a large number of UDP packets to random ports, depleting network bandwidth and system resources, leading to a DoS attack.'
  }
];

export const aptAttack = [
  {
    id: 1,
    name_ko: '스피어 피싱(Spear Fishing) 공격',
    description_ko: '특정 조직이나 개인을 겨냥한 맞춤형 피싱 메일을 보내는 공격으로, 신뢰할 수 있는 발신자로 위장하여 악성코드를 전송하거나 중요 정보를 탈취합니다.',
    name_en: 'Spear Phishing Attack',
    description_en: 'A targeted phishing attack aimed at specific organizations or individuals, where the attacker impersonates a trusted sender to deliver malware or steal sensitive information.'
  },
  {
    id: 2,
    name_ko: '워터링홀(Watering Hole) 공격',
    description_ko: '목표 조직의 임직원들이 자주 방문하는 웹사이트를 해킹하여 악성코드를 심어두고, 웹사이트 방문자들을 감염시키는 공격입니다.',
    name_en: 'Watering Hole Attack',
    description_en: 'This attack compromises websites frequently visited by employees of the targeted organization, embedding malware to infect website visitors.'
  },
  {
    id: 3,
    name_ko: '제로데이(0-Day) 취약점 공격',
    description_ko: '아직 보안 패치가 공개되지 않은 소프트웨어의 보안 취약점을 이용하여 시스템에 침투하는 고도화된 공격입니다.',
    name_en: 'Zero-Day Vulnerability Attack',
    description_en: 'An advanced attack exploiting security vulnerabilities in software that have not yet been patched or publicly disclosed, allowing the attacker to infiltrate the system.'
  },
  {
    id: 4,
    name_ko: '공급망(Supply Chain) 공격',
    description_ko: '신뢰할 수 있는 소프트웨어 공급업체나 서비스 제공업체를 통해 악성코드를 유포하는 간접적인 공격 방식입니다.',
    name_en: 'Supply Chain Attack',
    description_en: 'An indirect attack method that spreads malware through trusted software vendors or service providers.'
  },
  {
    id: 5,
    name_ko: '탐지회피(Defense Evasion) 공격',
    description_ko: '백신 등 보안 프로그램의 탐지를 피해 장기간에 걸쳐 은밀하게 시스템에 잠복하면서 정보를 수집하고 유출하는 지능형 공격입니다.',
    name_en: 'Defense Evasion Attack',
    description_en: 'An intelligent attack that evades detection by security programs (e.g., antivirus) and remains hidden within the system over an extended period, gathering and exfiltrating information.'
  }
];

export const vulnAttack = [
  {
    id: 1,
    name_ko: '공유 메모리 조작',
    description_ko: '프로세스 간 공유되는 메모리 영역을 악의적으로 조작하여 데이터를 탈취하거나 변조하는 공격입니다.',
    name_en: 'Shared Memory Manipulation',
    description_en: 'An attack that maliciously manipulates shared memory areas between processes to steal or alter data.'
  },
  {
    id: 2,
    name_ko: '파이프 하이재킹(Pipe Hijacking)',
    description_ko: '프로세스 간 통신에 사용되는 파이프를 가로채어 데이터를 도청하거나 변조하는 공격입니다.',
    name_en: 'Pipe Hijacking',
    description_en: 'An attack that intercepts pipes used for inter-process communication to eavesdrop or modify data.'
  }, 
  {
    id: 3,
    name_ko: '힙 오버플로우(Heap Overflow) 공격',
    description_ko: '힙 메모리에 과도한 데이터를 삽입하여 시스템 자원을 고갈시키거나 버퍼 오버플로우를 유발하는 공격입니다.',
    name_en: 'Heap Overflow Attack',
    description_en: 'An attack that inserts excessive data into heap memory, exhausting system resources or triggering buffer overflow.'
  },
  {
    id: 4,
    name_ko: '레이스컨디션(Race Condition) 공격',
    description_ko: '프로세스 간 동기화에 사용되는 세마포어를 조작하여 의도적으로 교착상태를 발생시키는 공격입니다.',
    name_en: 'Race Condition Attack',
    description_en: 'An attack that manipulates semaphores used for process synchronization, intentionally causing a deadlock.'
  },
  {
    id: 5,
    name_ko: 'RPC 취약점 공격',
    description_ko: '원격 프로시저를 호출하는 절차에서 발생하는 취약점을 이용하여 원격으로 임의 코드를 실행하는 공격입니다.',
    name_en: 'RPC Vulnerability Attack',
    description_en: 'An attack that exploits vulnerabilities in the procedure for Remote Procedure Calls (RPC) to remotely execute arbitrary code.'
  }
];

export const financeAttack = [
  {
    id: 1,
    name_ko: '계정 탈취 공격',
    description_ko: '사회공학적 방법이나 악성코드를 통해 금융 계정 정보를 탈취하여 불법 이체나 거래를 시도하는 공격입니다.',
    name_en: 'Account Takeover Attack',
    description_en: 'An attack that steals financial account information through social engineering or malware to attempt illegal transfers or transactions.'
  },
  {
    id: 2,
    name_ko: '거래 변조 공격',
    description_ko: '정상적인 금융 거래 과정에 개입하여 거래 정보를 변조함으로써 자금을 탈취하는 공격입니다.',
    name_en: 'Transaction Tampering Attack',
    description_en: 'An attack that interferes with legitimate financial transactions and alters transaction information to steal funds.'
  },
  {
    id: 3,
    name_ko: '인증 우회 공격',
    description_ko: '이중 인증이나 보안카드 등의 금융 보안 장치를 우회하여 불법적인 거래를 시도하는 공격입니다.',
    name_en: 'Authentication Bypass Attack',
    description_en: 'An attack that bypasses financial security devices such as two-factor authentication or security cards to attempt unauthorized transactions.'
  },
  {
    id: 4,
    name_ko: '금융 앱 변조',
    description_ko: '정상적인 금융 앱을 변조하여 사용자의 금융 정보를 탈취하거나 거래를 조작하는 공격입니다.',
    name_en: 'Financial App Tampering',
    description_en: 'An attack that modifies legitimate financial apps to steal user financial information or manipulate transactions.'
  },
  {
    id: 5,
    name_ko: 'ATM 스키밍(Skimming)',
    description_ko: 'ATM기기에 물리적인 장치를 설치하여 카드 정보와 비밀번호를 탈취하는 공격입니다.',
    name_en: 'ATM Skimming',
    description_en: 'An attack that installs physical devices on ATMs to capture card information and PINs.'
  }
];

// GUI 단계별 설명
export const guiStepDetails = [
  {
    step: 1,
    title_ko: '모든 데이터의 일원화된 뷰 및 저장 기능 제공',
    title_en: 'Unified View and Storage Functionality for All Data',
    description_ko: '전체적인 데이터를 한눈에 확인하고, 필요한 정보를 손쉽게 저장할 수 있도록 기본보고서를 지원합니다.',
    description_en: 'Provides comprehensive reports to easily view overall data at a glance and store necessary information effortlessly.',
  },
  {
    step: 2,
    title_ko: '에이전트 상태의 직관적인 시각화',
    title_en: 'Intuitive Visualization of Agent Status',
    description_ko: '에이전트와 그룹 정보를 직관적으로 확인하며, 효율적으로 관리 및 실행할 수 있는 UI를 제공합니다.',
    description_en: 'Provides a UI that allows intuitive monitoring of agent and group information, enabling efficient management and execution.',
  },
  {
    step: 3,
    title_ko: '시뮬레이션 실행 및 예약',
    title_en: 'Simulation Execution and Scheduling',
    description_ko: '특정 에이전트 또는 그룹에 대한 시뮬레이션을 선택하여 즉시 실행하거나 예약할 수 있습니다. 모의 해킹과 달리 필요한 환경을 직접 구축하여 취약점을 테스트하는 기능을 제공합니다.',
    description_en: 'Allows you to select and execute simulations immediately or schedule them for specific agents or groups. Unlike traditional penetration testing, this feature enables you to build the required environment directly to test vulnerabilities.',
  },
  {
    step: 4,
    title_ko: '직관적인 실행 결과 확인 <span class="patent-tech">특허 출원 기술</span>',
    title_en: 'Intuitive Execution Results Monitoring <span class="patent-tech">Patent application technology</span>',
    description_ko: '실행 중인 시뮬레이션의 각 단계와 상태를 직관적으로 확인 가능합니다. BreakPoint, Resume, Suspend, Step, Abort의 세밀한 제어 기능을 제공하여 시뮬레이션 진행 과정을 통제할 수 있습니다.',
    description_en: 'Easily monitor each stage and status of running simulations with an intuitive interface. Provides detailed control features such as BreakPoint, Resume, Suspend, Step, and Abort to manage the simulation process effectively.',
  },
  {
    step: 5,
    title_ko: '간편한 공격 시나리오 커스터마이징',
    title_en: 'Easy Attack Scenario Customization',
    description_ko: '기본 제공되는 공격 시나리오를 바탕으로 간편하게 수정 및 추가할 수 있으며, 새로운 공격 시나리오를 직접 생성하여 맞춤 구성할 수 있습니다.',
    description_en: 'Easily modify and add to the provided default attack scenarios, or create new attack scenarios to customize them to your needs.',
  },
  {
    step: 6,
    title_ko: '공격 시나리오 정보의 종합 제공',
    title_en: 'Comprehensive Provision of Attack Scenario Information',
    description_ko: '사용자가 커스터마이징한 공격 시나리오뿐만 아니라 PurpleHound에서 기본 제공하는 최신 공격 시나리오 목록을 사용할 수 있습니다.',
    description_en: 'In addition to user-customized attack scenarios, you can also access the latest attack scenario list provided by PurpleHound.',
  },
];
