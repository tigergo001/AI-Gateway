import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, MessageSquare, Smartphone, Globe, Key, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

type LoginMethod = 'options' | 'phone';
type PhoneTab = 'pwd' | 'code';
type LegalDoc = 'terms' | 'privacy' | null;

export const Login = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { login } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('13888888888');
  const [password, setPassword] = useState('888888');
  const [code, setCode] = useState('888888');
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('options');
  const [phoneTab, setPhoneTab] = useState<PhoneTab>('pwd');
  const [legalDoc, setLegalDoc] = useState<LegalDoc>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showAgreementDialog, setShowAgreementDialog] = useState(false);
  const [shakeAgreement, setShakeAgreement] = useState(false);
  const [pendingLogin, setPendingLogin] = useState<(() => void) | null>(null);

  const handleWechatLogin = () => {
    if (!agreedToTerms) {
      setShakeAgreement(true);
      setTimeout(() => setShakeAgreement(false), 500);
      setPendingLogin(() => doWechatLogin);
      setShowAgreementDialog(true);
      return;
    }
    doWechatLogin();
  };

  const doWechatLogin = () => {
    login({ id: '1', name: 'WeChat User' });
    navigate('/');
  };

  const handlePhoneLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      setShakeAgreement(true);
      setTimeout(() => setShakeAgreement(false), 500);
      setPendingLogin(() => doPhoneLogin);
      setShowAgreementDialog(true);
      return;
    }
    doPhoneLogin();
  };

  const doPhoneLogin = () => {
    if(phoneNumber.length > 5) {
      login({ id: '2', name: phoneNumber });
      navigate('/');
    } else {
      alert('Please enter a valid phone number');
    }
  };

  const handleAgreeAndLogin = () => {
    setAgreedToTerms(true);
    setShowAgreementDialog(false);
    if (pendingLogin) {
      pendingLogin();
      setPendingLogin(null);
    }
  };

  const handleDecline = () => {
    setShowAgreementDialog(false);
    setPendingLogin(null);
  };

  return (
    <div className="min-h-screen bg-[#431407] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Image/Gradient */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img 
          src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000" 
          alt="AI Network" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#431407] via-[#ea580c]/50 to-[#d97706]/30" />
      </div>

      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-container rounded-full blur-[120px] opacity-20 -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-container rounded-full blur-[120px] opacity-20 -ml-48 -mb-48" />

      {/* Language Switcher */}
      <nav className="fixed top-0 left-0 right-0 h-16 flex items-center justify-end px-4 z-20">
        <div className="glass-panel flex items-center rounded-full p-1 border border-white/20">
          <button 
            onClick={() => setLanguage('zh')}
            className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all uppercase tracking-widest ${language === 'zh' ? 'bg-primary text-white shadow-sm' : 'text-white/70 hover:bg-white/10'}`}
          >
            中文
          </button>
          <button 
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all uppercase tracking-widest ${language === 'en' ? 'bg-primary text-white shadow-sm' : 'text-white/70 hover:bg-white/10'}`}
          >
            EN
          </button>
        </div>
      </nav>

      <motion.main 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[400px] flex flex-col items-center gap-6 z-10"
      >
        <div className="glass-panel w-full rounded-2xl p-8 border border-white/20 shadow-2xl flex flex-col items-center">
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-xl mx-auto ring-4 ring-primary/20">
              <LayoutGrid className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-display text-2xl font-bold text-white mb-2">{t('login.title')}</h1>
            <p className="text-sm text-white/60 font-medium">{t('login.subtitle')}</p>
          </div>

          {/* Social Logins */}
          <div className="w-full flex flex-col gap-4 mb-10">
            {loginMethod === 'phone' ? (
              <div className="w-full flex flex-col gap-4">
                {/* Tabs */}
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                  <button 
                    onClick={() => setPhoneTab('pwd')}
                    className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${phoneTab === 'pwd' ? 'bg-white/20 text-white shadow-sm' : 'text-white/60 hover:text-white'}`}
                  >
                    {t('login.phonePwd')}
                  </button>
                  <button 
                    onClick={() => setPhoneTab('code')}
                    className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${phoneTab === 'code' ? 'bg-white/20 text-white shadow-sm' : 'text-white/60 hover:text-white'}`}
                  >
                    {t('login.phoneCode')}
                  </button>
                </div>

                <form onSubmit={handlePhoneLoginSubmit} className="w-full flex flex-col gap-3">
                  <input 
                    type="tel" 
                    placeholder={t('login.phonePlaceholder') as string} 
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    className="w-full h-12 bg-white/10 border-2 border-white/20 text-white rounded-xl px-4 text-sm focus:outline-none focus:border-primary placeholder:text-white/50" 
                  />
                  {phoneTab === 'pwd' ? (
                    <input 
                      type="password" 
                      placeholder={t('login.passwordPlaceholder') as string} 
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full h-12 bg-white/10 border-2 border-white/20 text-white rounded-xl px-4 text-sm focus:outline-none focus:border-primary placeholder:text-white/50" 
                    />
                  ) : (
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder={t('login.codePlaceholder') as string} 
                        value={code}
                        onChange={e => setCode(e.target.value)}
                        className="flex-1 h-12 bg-white/10 border-2 border-white/20 text-white rounded-xl px-4 text-sm focus:outline-none focus:border-primary placeholder:text-white/50" 
                      />
                      <button type="button" className="h-12 px-4 bg-white/10 border-2 border-white/20 text-white/90 rounded-xl text-xs font-bold hover:bg-white/20 transition-colors whitespace-nowrap">
                        {t('login.getCode')}
                      </button>
                    </div>
                  )}
                  <button 
                    type="submit"
                    className="w-full h-12 bg-primary text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary-container active:scale-[0.98] transition-all mt-2"
                  >
                    {t('login.submit')}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setLoginMethod('options')}
                    className="w-full h-12 bg-transparent text-white/70 rounded-xl font-bold text-sm hover:text-white transition-all text-xs"
                  >
                    {t('login.back')}
                  </button>
                </form>
              </div>
            ) : (
             <>
              <button 
                onClick={handleWechatLogin}
                className="w-full h-12 bg-[#07C160] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#06ad56] active:scale-[0.98] transition-all shadow-lg shadow-black/20"
              >
                <MessageSquare className="w-5 h-5 fill-white" />
                {t('login.wechat')}
              </button>
              <button 
                onClick={() => setLoginMethod('phone')}
                className="w-full h-12 bg-transparent border-2 border-white/30 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/5 active:scale-[0.98] transition-all"
              >
                <Smartphone className="w-5 h-5" />
                {t('login.phone')}
              </button>
             </>
            )}
          </div>

          {/* Divider */}
          <div className="w-full flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-white/20" />
            <span className="text-[10px] font-black text-white/30 uppercase tracking-widest leading-none">{t('login.fast')}</span>
            <div className="h-px flex-1 bg-white/20" />
          </div>

          {/* Legal */}
          <motion.div 
            animate={shakeAgreement ? { x: [-10, 10, -10, 10, -5, 5, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="flex items-start gap-3 w-full group cursor-pointer"
          >
            <div className="relative flex items-center pt-0.5">
              <input 
                type="checkbox" 
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-5 h-5 rounded border-white/30 bg-transparent text-primary focus:ring-primary/20 cursor-pointer"
              />
            </div>
            <label htmlFor="terms" className="text-[11px] text-white/50 leading-relaxed select-none">
              {t('login.agree', {
                terms: <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLegalDoc('terms'); }} className="text-white font-bold underline decoration-primary/50 relative z-10 cursor-pointer hover:text-primary transition-colors">{t('login.terms')}</span>,
                privacy: <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLegalDoc('privacy'); }} className="text-white font-bold underline decoration-primary/50 relative z-10 cursor-pointer hover:text-primary transition-colors">{t('login.privacy')}</span>
              })}
            </label>
          </motion.div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
          <span className="text-[9px] font-black text-white/70 uppercase tracking-widest">{t('login.status')}</span>
        </div>
      </motion.main>

      <AnimatePresence>
        {legalDoc && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-surface-container rounded-2xl p-6 w-full max-w-md shadow-xl text-on-surface"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">{ legalDoc === 'terms' ? t('login.terms') : t('login.privacy') }</h3>
                <button onClick={() => setLegalDoc(null)} className="text-on-surface-variant hover:text-on-surface p-1 rounded-full"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto text-sm text-on-surface-variant p-2">
                <p>Curabitur quis justo rutrum, tempus mi sit amet, feugiat velit. Vestibulum sed eros vitae metus feugiat dictum eget eget nibh.</p>
                <p>Nunc quis tellus at ante lacinia fringilla ut cursus lacus. Fusce varius magna et quam laoreet consequat. Nullam finibus in tellus quis volutpat.</p>
                <p>Morbi sagittis, ipsum varius mollis scelerisque, sapien leo gravida arcu, eu tempus metus sem sed metus. Praesent elementum pulvinar turpis, ut egestas nisi bibendum eu.</p>
                <p>Aenean condimentum, tortor in eleifend facilisis, tellus leo varius tellus, nec interdum dolor lacus nec dui.</p>
                <p>Vestibulum varius erat tellus, sed commodo dolor porta vitae. Vestibulum tristique sapien in tortor sollicitudin varius.</p>
              </div>
              <div className="mt-6 pt-4 border-t border-outline-variant flex justify-end">
                <button
                  onClick={() => setLegalDoc(null)}
                  className="px-6 py-2 bg-primary text-white font-bold rounded-xl active:scale-[0.98] transition-transform"
                >
                  {t('login.close') || 'Close'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
        {showAgreementDialog && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-surface-container rounded-2xl p-6 w-full max-w-sm shadow-xl text-on-surface text-center"
            >
              <h3 className="font-bold text-lg mb-4">{t('login.pleaseAgree')}</h3>
              <p className="text-sm text-on-surface-variant mb-6 text-left">
                {language === 'en' ? 'To continue, please review and agree to our Terms of Service and Privacy Policy.' : '继续操作前，请先阅读并同意我们的服务条款与隐私政策。'}
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleDecline}
                  className="px-4 py-2 bg-surface-container-high text-on-surface hover:bg-surface-container-highest font-bold rounded-xl active:scale-[0.98] transition-transform text-sm"
                >
                  {language === 'en' ? 'Decline' : '拒绝'}
                </button>
                <button
                  onClick={handleAgreeAndLogin}
                  className="px-4 py-2 bg-primary text-white font-bold rounded-xl active:scale-[0.98] transition-transform text-sm shadow-md"
                >
                  {language === 'en' ? 'Confirm and Login' : '确认并登录'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
