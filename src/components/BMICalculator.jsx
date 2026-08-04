import React, { useState, useMemo } from 'react';
import { Calculator, Flame, Activity, ArrowRight, Scale, FileText } from 'lucide-react';
import { ShinyButton } from './ui/shiny-button';
import BMIReportModal from './BMIReportModal';

export default function BMICalculator() {
  const [gender, setGender] = useState('male'); // 'male' | 'female'
  const [age, setAge] = useState(25);
  const [heightCm, setHeightCm] = useState(175);
  const [weightKg, setWeightKg] = useState(72);
  const [activityLevel, setActivityLevel] = useState(1.55); // 1.2 to 1.9
  const [goal, setGoal] = useState('maintenance'); // 'loss' | 'maintenance' | 'gain'
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const activityOptions = [
    { label: 'Sedentary', value: 1.2, desc: 'Desk job' },
    { label: 'Light', value: 1.375, desc: '1-3 days/wk' },
    { label: 'Moderate', value: 1.55, desc: '3-5 days/wk' },
    { label: 'Active', value: 1.725, desc: '6-7 days/wk' },
    { label: 'Extra Active', value: 1.9, desc: 'Heavy training' },
  ];

  const goalOptions = [
    { id: 'loss', label: 'Weight Loss', delta: -500, tag: '-500 kcal' },
    { id: 'maintenance', label: 'Maintain', delta: 0, tag: 'Maintain' },
    { id: 'gain', label: 'Muscle Gain', delta: 400, tag: '+400 kcal' },
  ];

  // Calculations
  const bmiResults = useMemo(() => {
    const heightM = heightCm / 100;
    const bmi = (weightKg / (heightM * heightM)).toFixed(1);
    const bmiNum = parseFloat(bmi);

    let category = 'Normal Weight';
    let color = 'text-emerald-400';
    let positionPercent = 50;

    if (bmiNum < 18.5) {
      category = 'Underweight';
      color = 'text-amber-400';
      positionPercent = Math.min(Math.max(((bmiNum - 12) / (18.5 - 12)) * 25, 5), 25);
    } else if (bmiNum <= 24.9) {
      category = 'Normal Weight (Ideal)';
      color = 'text-emerald-400';
      positionPercent = 25 + ((bmiNum - 18.5) / (24.9 - 18.5)) * 25;
    } else if (bmiNum <= 29.9) {
      category = 'Overweight';
      color = 'text-orange-400';
      positionPercent = 50 + ((bmiNum - 25) / (29.9 - 25)) * 25;
    } else {
      category = 'Obese';
      color = 'text-red-400';
      positionPercent = Math.min(75 + ((bmiNum - 30) / (40 - 30)) * 25, 95);
    }

    let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
    bmr += gender === 'male' ? 5 : -161;

    const tdee = Math.round(bmr * activityLevel);
    const selectedGoalObj = goalOptions.find((g) => g.id === goal);
    const selectedActivityObj = activityOptions.find((a) => a.value === activityLevel);
    const calorieTarget = Math.max(1200, tdee + (selectedGoalObj ? selectedGoalObj.delta : 0));

    const proteinGrams = Math.round((calorieTarget * 0.30) / 4);
    const carbsGrams = Math.round((calorieTarget * 0.45) / 4);
    const fatsGrams = Math.round((calorieTarget * 0.25) / 9);

    return {
      gender,
      age,
      heightCm,
      weightKg,
      activityLabel: selectedActivityObj ? selectedActivityObj.label : 'Moderate',
      goalLabel: selectedGoalObj ? selectedGoalObj.label : 'Maintain',
      goalId: goal,
      bmi,
      category,
      color,
      positionPercent,
      calorieTarget,
      proteinGrams,
      carbsGrams,
      fatsGrams,
    };
  }, [gender, age, heightCm, weightKg, activityLevel, goal]);

  return (
    <>
      <section className="py-8 sm:py-12 bg-slate-950 text-slate-100 relative overflow-hidden w-full border-t border-b border-slate-800/80 min-h-[85vh] flex flex-col justify-center" id="bmi-calculator">
        {/* Background ambient lighting */}
        <div className="absolute top-1/2 left-10 w-80 h-80 bg-orange-600/10 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />
        <div className="absolute bottom-5 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-5 my-auto">
          {/* Section Header */}
          <div className="text-center space-y-1.5 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
              <Calculator className="w-3.5 h-3.5 text-orange-500" />
              BMI &amp; Calorie Calculator
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Know Your Numbers
            </h2>
          </div>

          {/* Calculator Widget Grid with Shiny Feature Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start max-w-5xl mx-auto">
            
            {/* Inputs Column wrapped in ShinyButton Feature Box */}
            <ShinyButton className="relative group rounded-2xl p-[1px] bg-gradient-to-b from-orange-500/30 via-slate-800/50 to-slate-950/80 shadow-xl flex flex-col w-full text-left justify-start cursor-default lg:col-span-7">
              <div className="p-4 sm:p-5 rounded-[15px] bg-slate-950/95 backdrop-blur-2xl space-y-3.5 flex flex-col border border-slate-800/80 w-full">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-orange-500" /> Enter Metrics
                  </h3>

                  {/* Gender Toggle */}
                  <div className="flex items-center p-0.5 rounded-lg bg-slate-950 border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setGender('male')}
                      className={`px-3 py-1 rounded-md text-[11px] font-extrabold transition-all cursor-pointer ${
                        gender === 'male'
                          ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Male ♂
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('female')}
                      className={`px-3 py-1 rounded-md text-[11px] font-extrabold transition-all cursor-pointer ${
                        gender === 'female'
                          ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Female ♀
                    </button>
                  </div>
                </div>

                {/* Sliders: Age, Height, Weight */}
                <div className="grid grid-cols-3 gap-3">
                  {/* Age */}
                  <div className="space-y-1 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between text-[11px] font-semibold">
                      <span className="text-slate-400">Age</span>
                      <span className="text-orange-400 font-extrabold">{age}y</span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="80"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full accent-orange-500 cursor-pointer h-1.5"
                    />
                  </div>

                  {/* Height */}
                  <div className="space-y-1 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between text-[11px] font-semibold">
                      <span className="text-slate-400">Height</span>
                      <span className="text-orange-400 font-extrabold">{heightCm}cm</span>
                    </div>
                    <input
                      type="range"
                      min="120"
                      max="220"
                      value={heightCm}
                      onChange={(e) => setHeightCm(Number(e.target.value))}
                      className="w-full accent-orange-500 cursor-pointer h-1.5"
                    />
                  </div>

                  {/* Weight */}
                  <div className="space-y-1 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between text-[11px] font-semibold">
                      <span className="text-slate-400">Weight</span>
                      <span className="text-orange-400 font-extrabold">{weightKg}kg</span>
                    </div>
                    <input
                      type="range"
                      min="35"
                      max="160"
                      value={weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value))}
                      className="w-full accent-orange-500 cursor-pointer h-1.5"
                    />
                  </div>
                </div>

                {/* Activity Level Selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Activity Level</label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                    {activityOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setActivityLevel(opt.value)}
                        className={`p-1.5 rounded-lg text-center border transition-all cursor-pointer ${
                          activityLevel === opt.value
                            ? 'bg-orange-500/20 border-orange-500 text-white font-bold'
                            : 'bg-slate-950/50 border-slate-800/80 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="text-[11px] leading-tight font-extrabold">{opt.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Goal Selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fitness Goal</label>
                  <div className="grid grid-cols-3 gap-2">
                    {goalOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setGoal(opt.id)}
                        className={`py-2 px-2 rounded-xl text-center border transition-all cursor-pointer ${
                          goal === opt.id
                            ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-500 shadow-sm'
                            : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="text-xs font-extrabold">{opt.label}</div>
                        <div className="text-[9px] text-amber-300 font-medium">{opt.tag}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </ShinyButton>

            {/* Results Column wrapped in ShinyButton Feature Box */}
            <ShinyButton className="relative group rounded-2xl p-[1px] bg-gradient-to-b from-orange-500/40 via-amber-500/30 to-slate-950/90 shadow-xl flex flex-col w-full text-left justify-start cursor-default lg:col-span-5">
              <div className="p-4 sm:p-5 rounded-[15px] bg-slate-950/95 backdrop-blur-2xl space-y-3.5 flex flex-col justify-between border border-slate-800/80 w-full relative overflow-hidden">
                {/* Top Glow Accent */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* BMI Card */}
                <div className="space-y-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Body Mass Index</span>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-3xl font-black text-white">{bmiResults.bmi}</span>
                        <span className={`text-xs font-extrabold ${bmiResults.color}`}>
                          {bmiResults.category}
                        </span>
                      </div>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                      <Activity className="w-4 h-4" />
                    </div>
                  </div>

                  {/* BMI Bar Indicator */}
                  <div className="space-y-1">
                    <div className="relative w-full h-2.5 bg-slate-800 rounded-full overflow-hidden flex">
                      <div className="w-1/4 bg-amber-400/80" />
                      <div className="w-1/4 bg-emerald-500/80" />
                      <div className="w-1/4 bg-orange-500/80" />
                      <div className="w-1/4 bg-red-500/80" />
                      
                      {/* Indicator Dot */}
                      <div
                        className="absolute top-0 bottom-0 w-2 bg-white border border-slate-950 rounded-full shadow transition-all duration-300"
                        style={{ left: `${bmiResults.positionPercent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[8px] text-slate-500 font-bold uppercase px-0.5">
                      <span>Under</span>
                      <span>Normal</span>
                      <span>Over</span>
                      <span>Obese</span>
                    </div>
                  </div>
                </div>

                {/* Calorie & Macro Target Card */}
                <div className="space-y-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target Daily Calories</span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-2xl font-black text-amber-400">{bmiResults.calorieTarget}</span>
                        <span className="text-slate-400 text-xs font-bold">kcal / day</span>
                      </div>
                    </div>
                    <Flame className="w-6 h-6 text-amber-500 animate-pulse" />
                  </div>

                  {/* Recommended Daily Macros */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Estimated Macros</span>
                    <div className="grid grid-cols-3 gap-1.5 text-center">
                      <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                        <span className="block text-[9px] text-slate-400 font-bold">Protein</span>
                        <span className="text-xs font-black text-orange-400">{bmiResults.proteinGrams}g</span>
                      </div>
                      <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                        <span className="block text-[9px] text-slate-400 font-bold">Carbs</span>
                        <span className="text-xs font-black text-yellow-400">{bmiResults.carbsGrams}g</span>
                      </div>
                      <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                        <span className="block text-[9px] text-slate-400 font-bold">Fats</span>
                        <span className="text-xs font-black text-amber-500">{bmiResults.fatsGrams}g</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button to Trigger Printable Report Modal */}
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 hover:from-orange-500 hover:to-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-orange-600/30 transition-all active:scale-98 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Get Personal Diet &amp; Training Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </ShinyButton>

          </div>
        </div>
      </section>

      {/* Fitness Report Download & Printable Modal */}
      <BMIReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        metricsData={bmiResults}
      />
    </>
  );
}
