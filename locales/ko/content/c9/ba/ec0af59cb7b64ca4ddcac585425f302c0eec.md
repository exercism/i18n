# 지침

우리 축구 클럽 [exercise:csharp/football-match-reports]() 팀은 리그에서 승승장구하고 있어요. 이번에는 보안 패스 인쇄 시스템 작업을 맡아 달라는 초대를 받았어요.

지원 인력의 클래스 계층 구조는 다음과 같아요.

```
TeamSupport (interface)
├ Chairman
├ Manager
└ Staff (abstract)
    ├ Physio
    ├ OffensiveCoach
    ├ GoalKeepingCoach
    └ Security
        ├ SecurityJunior
        ├ SecurityIntern
        └ PoliceLiaison
```

이 계층 구조의 완전한 구현이 연습 문제의 소스 코드에 포함되어 있어요.

보안 패스 생성기에 전달되는 모든 데이터는 이미 검증되었고, 절대 null이 아님이 보장돼요.

## 1. 지원 팀 구성원이 직원인 경우 표시 이름 가져오기

`SecurityPassMaker.GetDisplayName()` 메서드를 구현해 주세요. 이 메서드는 `Staff`에서 파생된 모든 클래스의 인스턴스에 대해서는 `Title` 필드의 값을 반환하고, 그 외의 경우에는 "Too Important for a Security Pass"를 반환해야 해요.

```csharp
var spm = new SecurityPassMaker();
spm.GetDisplayName(new Manager());
// => "Too Important for a Security Pass"
spm.GetDisplayName(new Physio());
// => "The Physio"
```

## 2. 보안 팀의 표시 이름 사용자 지정하기

`SecurityPassMaker.GetDisplayName()` 메서드를 수정해 주세요. 1번 작업과 똑같이 동작하되, 해당 직원이 보안 팀 구성원(`Security` 형식이거나 그 파생 형식 중 하나)이라면 제목 뒤에 " Priority Personnel"이라는 텍스트가 표시되어야 해요.

```csharp
var spm = new SecurityPassMaker();
spm.GetDisplayName(new Physio());
// => "The Physio"
var spm2 = new SecurityPassMaker();
spm2.GetDisplayName(new Security());
// => "Security Team Member Priority Personnel"
spm2.GetDisplayName(new SecurityJunior());
// => "Security Junior Priority Personnel"
```

## 3. 주요 보안 팀 구성원만 우선 인원으로 지정하기

`SecurityPassMaker.GetDisplayName()` 메서드를 수정해 주세요. 2번 작업과 똑같이 동작하되, `SecurityJunior`, `SecurityIntern`, `PoliceLiaison` 형식의 인스턴스에는 " Priority Personnel" 텍스트가 표시되지 않아야 해요.

```csharp
var spm2 = new SecurityPassMaker();
spm2.GetDisplayName(new Security());
// => "Security Team Member Priority Personnel"
spm2.GetDisplayName(new SecurityJunior());
// => "Security Junior"
```
