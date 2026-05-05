import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

type Answer = 'yes' | 'no' | 'not_important';
type CircleState = 'too_broad' | 'getting_closer' | 'circle_found' | 'rare_path' | 'no_matches';

type Question = {
  id: string;
  text: string;
  yesFactor: number;
  noFactor: number;
};

type AnswerRecord = {
  questionId: string;
  answer: Answer;
  circleBefore: number;
  circleAfter: number;
};

const INITIAL_CIRCLE_COUNT = 20000;

const QUESTIONS: Question[] = [
  {
    id: 'q_privacy_001',
    text: 'Would you accept state surveillance if it made society much safer?',
    yesFactor: 0.42,
    noFactor: 0.54,
  },
  {
    id: 'q_truth_001',
    text: 'Would you tell an unpopular truth if it cost you most of your social circle?',
    yesFactor: 0.34,
    noFactor: 0.49,
  },
  {
    id: 'q_family_001',
    text: 'Would you help a close family member avoid punishment for a crime?',
    yesFactor: 0.31,
    noFactor: 0.58,
  },
  {
    id: 'q_mercy_001',
    text: 'Should mercy matter when judging someone who caused serious harm?',
    yesFactor: 0.47,
    noFactor: 0.39,
  },
  {
    id: 'q_action_001',
    text: 'Should people in your circle be willing to help offline, not only agree online?',
    yesFactor: 0.36,
    noFactor: 0.45,
  },
  {
    id: 'q_risk_001',
    text: 'Would you join a local initiative if it carried social risk but felt necessary?',
    yesFactor: 0.29,
    noFactor: 0.51,
  },
];

function formatCount(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

function getCircleState(count: number): CircleState {
  if (count === 0) {
    return 'no_matches';
  }

  if (count < 50) {
    return 'rare_path';
  }

  if (count <= 150) {
    return 'circle_found';
  }

  if (count <= 1000) {
    return 'getting_closer';
  }

  return 'too_broad';
}

function getStateLabel(state: CircleState) {
  switch (state) {
    case 'too_broad':
      return 'Still broad';
    case 'getting_closer':
      return 'Getting closer';
    case 'circle_found':
      return 'Circle found';
    case 'rare_path':
      return 'Rare path';
    case 'no_matches':
      return 'No matches';
  }
}

function getStateMessage(state: CircleState) {
  switch (state) {
    case 'too_broad':
      return 'Answer more questions to make the circle more useful.';
    case 'getting_closer':
      return 'The circle is becoming focused. A few more choices can sharpen it.';
    case 'circle_found':
      return 'This is a useful circle. You can stop here or narrow it further.';
    case 'rare_path':
      return 'Very few people match this path. That is rare, not a failure.';
    case 'no_matches':
      return 'No one in this local prototype matches all important answers yet.';
  }
}

function getResultMessage(record: AnswerRecord | null) {
  if (!record) {
    return 'Start with your first answer.';
  }

  if (record.answer === 'not_important') {
    return 'This question did not affect your circle.';
  }

  const change = record.circleBefore - record.circleAfter;
  return `${formatCount(change)} people were filtered out by this answer.`;
}

function calculateNextCount(currentCount: number, question: Question, answer: Answer) {
  if (answer === 'not_important') {
    return currentCount;
  }

  const factor = answer === 'yes' ? question.yesFactor : question.noFactor;
  return Math.max(0, Math.round(currentCount * factor));
}

export default function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [circleCount, setCircleCount] = useState(INITIAL_CIRCLE_COUNT);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [lastAnswer, setLastAnswer] = useState<AnswerRecord | null>(null);
  const { width } = useWindowDimensions();

  const currentQuestion = QUESTIONS[questionIndex % QUESTIONS.length];
  const circleState = getCircleState(circleCount);
  const importantAnswerCount = answers.filter((item) => item.answer !== 'not_important').length;
  const progress = Math.min(1, importantAnswerCount / 7);
  const isWide = width >= 760;

  const answerSummary = useMemo(() => {
    const yes = answers.filter((item) => item.answer === 'yes').length;
    const no = answers.filter((item) => item.answer === 'no').length;
    const notImportant = answers.filter((item) => item.answer === 'not_important').length;

    return { yes, no, notImportant };
  }, [answers]);

  const handleAnswer = (answer: Answer) => {
    const nextCount = calculateNextCount(circleCount, currentQuestion, answer);
    const record: AnswerRecord = {
      questionId: currentQuestion.id,
      answer,
      circleBefore: circleCount,
      circleAfter: nextCount,
    };

    setCircleCount(nextCount);
    setAnswers((current) => [...current, record]);
    setLastAnswer(record);
  };

  const handleNextQuestion = () => {
    setQuestionIndex((current) => current + 1);
    setLastAnswer(null);
  };

  const handleReset = () => {
    setQuestionIndex(0);
    setCircleCount(INITIAL_CIRCLE_COUNT);
    setAnswers([]);
    setLastAnswer(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.shell, isWide && styles.shellWide]}>
          <View style={styles.header}>
            <Text style={styles.brand}>Taqyro</Text>
            <Text style={styles.stage}>Local web prototype</Text>
          </View>

          <View style={styles.metricsRow}>
            <View style={styles.metricBlock}>
              <Text style={styles.metricLabel}>Your circle</Text>
              <Text style={styles.metricValue}>{formatCount(circleCount)}</Text>
              <Text style={styles.metricCaption}>people</Text>
            </View>

            <View style={[styles.stateBadge, styles[`state_${circleState}`]]}>
              <Text style={styles.stateBadgeText}>{getStateLabel(circleState)}</Text>
            </View>
          </View>

          <View style={styles.focusTrack}>
            <View style={[styles.focusFill, { width: `${Math.max(8, progress * 100)}%` }]} />
          </View>

          <View style={styles.questionArea}>
            <Text style={styles.questionNumber}>Question {(questionIndex % QUESTIONS.length) + 1}</Text>
            <Text style={styles.questionText}>{currentQuestion.text}</Text>
          </View>

          <View style={styles.answerGrid}>
            <AnswerButton label="Yes" tone="yes" disabled={!!lastAnswer} onPress={() => handleAnswer('yes')} />
            <AnswerButton label="No" tone="no" disabled={!!lastAnswer} onPress={() => handleAnswer('no')} />
            <AnswerButton
              label="Not important"
              tone="neutral"
              disabled={!!lastAnswer}
              onPress={() => handleAnswer('not_important')}
            />
          </View>

          <View style={styles.resultPanel}>
            <Text style={styles.resultTitle}>{getResultMessage(lastAnswer)}</Text>
            <Text style={styles.resultBody}>{getStateMessage(circleState)}</Text>
          </View>

          <View style={styles.summaryGrid}>
            <SummaryItem label="Yes" value={answerSummary.yes} />
            <SummaryItem label="No" value={answerSummary.no} />
            <SummaryItem label="Not important" value={answerSummary.notImportant} />
            <SummaryItem label="Important" value={importantAnswerCount} />
          </View>

          <View style={styles.actionsRow}>
            <Pressable
              accessibilityRole="button"
              disabled={!lastAnswer}
              style={({ pressed }) => [
                styles.primaryAction,
                !lastAnswer && styles.disabledAction,
                pressed && lastAnswer && styles.pressed,
              ]}
              onPress={handleNextQuestion}
            >
              <Text style={styles.primaryActionText}>Next question</Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              style={({ pressed }) => [styles.secondaryAction, pressed && styles.pressed]}
              onPress={handleReset}
            >
              <Text style={styles.secondaryActionText}>Reset</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function AnswerButton({
  label,
  tone,
  disabled,
  onPress,
}: {
  label: string;
  tone: 'yes' | 'no' | 'neutral';
  disabled: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [
        styles.answerButton,
        styles[`answer_${tone}`],
        disabled && styles.disabledAnswer,
        pressed && !disabled && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.answerButtonText}>{label}</Text>
    </Pressable>
  );
}

function SummaryItem({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.summaryItem}>
      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f0e8',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  shell: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 620,
    gap: 9,
  },
  shellWide: {
    paddingTop: 18,
  },
  header: {
    alignItems: 'flex-start',
    gap: 4,
  },
  brand: {
    color: '#17211b',
    fontSize: 28,
    fontWeight: '800',
  },
  stage: {
    color: '#6a6256',
    fontSize: 14,
    fontWeight: '600',
  },
  metricsRow: {
    alignItems: 'stretch',
    flexDirection: 'row',
    gap: 12,
  },
  metricBlock: {
    backgroundColor: '#fffdf8',
    borderColor: '#ded5c6',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    minHeight: 84,
    padding: 12,
  },
  metricLabel: {
    color: '#6a6256',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  metricValue: {
    color: '#17211b',
    fontSize: 30,
    fontWeight: '900',
    marginTop: 8,
  },
  metricCaption: {
    color: '#6a6256',
    fontSize: 15,
    fontWeight: '600',
  },
  stateBadge: {
    alignItems: 'center',
    borderRadius: 8,
    flexBasis: 142,
    justifyContent: 'center',
    minHeight: 84,
    padding: 12,
  },
  stateBadgeText: {
    color: '#fffdf8',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  state_too_broad: {
    backgroundColor: '#3d5a80',
  },
  state_getting_closer: {
    backgroundColor: '#287271',
  },
  state_circle_found: {
    backgroundColor: '#2d6a4f',
  },
  state_rare_path: {
    backgroundColor: '#9a6a18',
  },
  state_no_matches: {
    backgroundColor: '#9b2c2c',
  },
  focusTrack: {
    backgroundColor: '#ded5c6',
    borderRadius: 999,
    height: 10,
    overflow: 'hidden',
  },
  focusFill: {
    backgroundColor: '#d88c2d',
    borderRadius: 999,
    height: '100%',
  },
  questionArea: {
    backgroundColor: '#17211b',
    borderRadius: 8,
    minHeight: 154,
    padding: 20,
    justifyContent: 'center',
  },
  questionNumber: {
    color: '#d88c2d',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  questionText: {
    color: '#fffdf8',
    fontSize: 25,
    fontWeight: '800',
    lineHeight: 31,
  },
  answerGrid: {
    gap: 10,
  },
  answerButton: {
    alignItems: 'center',
    borderRadius: 8,
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  answer_yes: {
    backgroundColor: '#2d6a4f',
  },
  answer_no: {
    backgroundColor: '#9b2c2c',
  },
  answer_neutral: {
    backgroundColor: '#5c6670',
  },
  disabledAnswer: {
    opacity: 0.48,
  },
  answerButtonText: {
    color: '#fffdf8',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  resultPanel: {
    backgroundColor: '#fffdf8',
    borderColor: '#ded5c6',
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  resultTitle: {
    color: '#17211b',
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 6,
  },
  resultBody: {
    color: '#4f564f',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  summaryItem: {
    backgroundColor: '#e9dfcf',
    borderRadius: 8,
    flexBasis: '47%',
    flexGrow: 1,
    minHeight: 74,
    padding: 12,
  },
  summaryValue: {
    color: '#17211b',
    fontSize: 23,
    fontWeight: '900',
  },
  summaryLabel: {
    color: '#6a6256',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  primaryAction: {
    alignItems: 'center',
    backgroundColor: '#17211b',
    borderRadius: 8,
    flex: 1,
    minHeight: 56,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  primaryActionText: {
    color: '#fffdf8',
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
  },
  disabledAction: {
    opacity: 0.35,
  },
  secondaryAction: {
    alignItems: 'center',
    borderColor: '#17211b',
    borderRadius: 8,
    borderWidth: 1,
    flexBasis: 104,
    minHeight: 56,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  secondaryActionText: {
    color: '#17211b',
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
});
