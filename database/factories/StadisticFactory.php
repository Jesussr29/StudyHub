<?php

namespace Database\Factories;

use App\Models\Stadistic;
use App\Models\Student;
use App\Models\Test;
use Illuminate\Database\Eloquent\Factories\Factory;

class StadisticFactory extends Factory
{
    protected $model = Stadistic::class;

    public function definition(): array
    {
        $totalQuestions = $this->faker->numberBetween(10, 50);

        $correctAnswers = $this->faker->numberBetween(0, $totalQuestions);
        $remaining = $totalQuestions - $correctAnswers;

        $incorrectAnswers = $this->faker->numberBetween(0, $remaining);
        $unansweredQuestions = $remaining - $incorrectAnswers;

        $score = $correctAnswers * 1;

        $completed = $this->faker->boolean(70); 
        $completedAt = $completed ? $this->faker->dateTimeBetween('-1 month', 'now') : null;
        $status = $completed ? 'completed' : 'in_progress';

        return [
            'student_id' => Student::inRandomOrder()->value('id'),
            'test_id' => Test::inRandomOrder()->value('id'),
            'total_questions' => $totalQuestions,
            'correct_answers' => $correctAnswers,
            'incorrect_answers' => $incorrectAnswers,
            'unanswered_questions' => $unansweredQuestions,
            'completed_at' => $completedAt,
            'score' => $score,
            'status' => $status,
        ];
    }
}
