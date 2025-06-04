<?php

namespace Database\Factories;

use App\Models\Student;
use App\Models\Test;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TestEvaluation>
 */
class TestEvaluationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'student_id' => Student::inRandomOrder()->value('id'),
            'test_id' => Test::inRandomOrder()->value('id'),
            'correct_answers' => $this->faker->numberBetween(0, 10),
            'incorrect_answers' => $this->faker->numberBetween(0, 10),
            'unanswered_questions' => $this->faker->numberBetween(0, 10),
            'score' => $this->faker->numberBetween(0, 10),
            'is_passed' => $this->faker->boolean(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
