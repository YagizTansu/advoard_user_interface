--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 15.12 (Ubuntu 15.12-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO auth.schema_migrations VALUES ('20171026211738');
INSERT INTO auth.schema_migrations VALUES ('20171026211808');
INSERT INTO auth.schema_migrations VALUES ('20171026211834');
INSERT INTO auth.schema_migrations VALUES ('20180103212743');
INSERT INTO auth.schema_migrations VALUES ('20180108183307');
INSERT INTO auth.schema_migrations VALUES ('20180119214651');
INSERT INTO auth.schema_migrations VALUES ('20180125194653');
INSERT INTO auth.schema_migrations VALUES ('00');
INSERT INTO auth.schema_migrations VALUES ('20210710035447');
INSERT INTO auth.schema_migrations VALUES ('20210722035447');
INSERT INTO auth.schema_migrations VALUES ('20210730183235');
INSERT INTO auth.schema_migrations VALUES ('20210909172000');
INSERT INTO auth.schema_migrations VALUES ('20210927181326');
INSERT INTO auth.schema_migrations VALUES ('20211122151130');
INSERT INTO auth.schema_migrations VALUES ('20211124214934');
INSERT INTO auth.schema_migrations VALUES ('20211202183645');
INSERT INTO auth.schema_migrations VALUES ('20220114185221');
INSERT INTO auth.schema_migrations VALUES ('20220114185340');
INSERT INTO auth.schema_migrations VALUES ('20220224000811');
INSERT INTO auth.schema_migrations VALUES ('20220323170000');
INSERT INTO auth.schema_migrations VALUES ('20220429102000');
INSERT INTO auth.schema_migrations VALUES ('20220531120530');
INSERT INTO auth.schema_migrations VALUES ('20220614074223');
INSERT INTO auth.schema_migrations VALUES ('20220811173540');
INSERT INTO auth.schema_migrations VALUES ('20221003041349');
INSERT INTO auth.schema_migrations VALUES ('20221003041400');
INSERT INTO auth.schema_migrations VALUES ('20221011041400');
INSERT INTO auth.schema_migrations VALUES ('20221020193600');
INSERT INTO auth.schema_migrations VALUES ('20221021073300');
INSERT INTO auth.schema_migrations VALUES ('20221021082433');
INSERT INTO auth.schema_migrations VALUES ('20221027105023');
INSERT INTO auth.schema_migrations VALUES ('20221114143122');
INSERT INTO auth.schema_migrations VALUES ('20221114143410');
INSERT INTO auth.schema_migrations VALUES ('20221125140132');
INSERT INTO auth.schema_migrations VALUES ('20221208132122');
INSERT INTO auth.schema_migrations VALUES ('20221215195500');
INSERT INTO auth.schema_migrations VALUES ('20221215195800');
INSERT INTO auth.schema_migrations VALUES ('20221215195900');
INSERT INTO auth.schema_migrations VALUES ('20230116124310');
INSERT INTO auth.schema_migrations VALUES ('20230116124412');
INSERT INTO auth.schema_migrations VALUES ('20230131181311');
INSERT INTO auth.schema_migrations VALUES ('20230322519590');
INSERT INTO auth.schema_migrations VALUES ('20230402418590');
INSERT INTO auth.schema_migrations VALUES ('20230411005111');
INSERT INTO auth.schema_migrations VALUES ('20230508135423');
INSERT INTO auth.schema_migrations VALUES ('20230523124323');
INSERT INTO auth.schema_migrations VALUES ('20230818113222');
INSERT INTO auth.schema_migrations VALUES ('20230914180801');
INSERT INTO auth.schema_migrations VALUES ('20231027141322');
INSERT INTO auth.schema_migrations VALUES ('20231114161723');
INSERT INTO auth.schema_migrations VALUES ('20231117164230');
INSERT INTO auth.schema_migrations VALUES ('20240115144230');
INSERT INTO auth.schema_migrations VALUES ('20240214120130');
INSERT INTO auth.schema_migrations VALUES ('20240306115329');
INSERT INTO auth.schema_migrations VALUES ('20240314092811');
INSERT INTO auth.schema_migrations VALUES ('20240427152123');
INSERT INTO auth.schema_migrations VALUES ('20240612123726');
INSERT INTO auth.schema_migrations VALUES ('20240729123726');
INSERT INTO auth.schema_migrations VALUES ('20240802193726');
INSERT INTO auth.schema_migrations VALUES ('20240806073726');
INSERT INTO auth.schema_migrations VALUES ('20241009103726');


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: buildings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.buildings VALUES ('acfd1492-7cd8-4de0-bba3-fcfdda9c7402', 'A Block', '4 Floors', 'academic', 'Main lecture halls and faculty offices.', '2025-03-31 12:01:52.35547+00');
INSERT INTO public.buildings VALUES ('7e59f0d2-3f1b-4ccd-af6d-17910f64fd4c', 'C Block', '5 Floors', 'academic', 'Library and study spaces.', '2025-03-31 12:01:52.35547+00');
INSERT INTO public.buildings VALUES ('4f972c6c-36f5-47c6-97ca-1df7992f1f53', 'Conference Center', '', 'administrative', 'Modern venue for academic conferences, seminars, and university events.', '2025-04-06 23:45:08.941391+00');
INSERT INTO public.buildings VALUES ('2d7ad5bb-e87d-442a-87d5-b805d790f0ad', 'University Library', '', 'administrative', 'Main campus library with extensive collections, study spaces, and research resources.', '2025-04-06 23:45:08.941391+00');
INSERT INTO public.buildings VALUES ('e128821e-fd27-49c2-8c83-ded7362483cb', 'E block', '1', 'academic', NULL, '2025-04-14 23:21:40.314411+00');
INSERT INTO public.buildings VALUES ('fc7e2425-be54-4737-922b-e8586821d354', 'K block', '1', 'academic', NULL, '2025-04-14 23:21:40.314411+00');
INSERT INTO public.buildings VALUES ('62a8d70c-0caa-4dc0-901c-c15df63a0065', 'M block', '1', 'academic', NULL, '2025-04-14 23:22:12.441166+00');
INSERT INTO public.buildings VALUES ('34b81c85-15c0-4ada-a4c0-8c35157935b0', 'konferans salonu', '1', 'academic', NULL, '2025-04-14 23:22:12.441166+00');
INSERT INTO public.buildings VALUES ('823d9638-cf03-4417-8fa6-db68c7b04c8d', 'Amfi Tiyatro', '1', 'academic', NULL, '2025-04-14 23:22:12.441166+00');
INSERT INTO public.buildings VALUES ('30ba4c5d-af4f-474b-bb08-03b214e11d37', 'Tesla', '1', 'academic', NULL, '2025-04-14 23:21:40.314411+00');


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categories VALUES ('cafeteria', 'categories.cafeteria.title', 'categories.cafeteria.description', 'FastfoodIcon', '#3a86ff');
INSERT INTO public.categories VALUES ('coffee', 'categories.coffee.title', 'categories.coffee.description', 'CoffeeIcon', '#8338ec');
INSERT INTO public.categories VALUES ('printing', 'categories.printing.title', 'categories.printing.description', 'LocalPrintshopIcon', '#ff006e');
INSERT INTO public.categories VALUES ('academic', 'categories.academic.title', 'categories.academic.description', 'SchoolIcon', '#3a0ca3');


--
-- Data for Name: common_destinations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.common_destinations VALUES ('4a508779-9a1d-4e0f-9381-6ad7fd58d4bd', 'Main Entrance', 'Main campus entrance gate', 'entrance', '2025-03-31 12:01:52.35547+00');
INSERT INTO public.common_destinations VALUES ('97b807df-0684-4465-8caa-6fc7a779c2bf', 'Library', 'Central library building', 'library', '2025-03-31 12:01:52.35547+00');
INSERT INTO public.common_destinations VALUES ('39b9f11a-a7c6-47ee-8c1b-af5b0932d505', 'Cafeteria', 'Main student cafeteria', 'restaurant', '2025-03-31 12:01:52.35547+00');
INSERT INTO public.common_destinations VALUES ('0a58848f-5e04-4e6f-aee3-dae9c61fbb75', 'Administrative Building', 'Student affairs and administration', 'business', '2025-03-31 12:01:52.35547+00');


--
-- Data for Name: information_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.information_categories VALUES ('academic', 'Academic Information', 'Akademik Bilgiler', 'Information about faculties, departments, and programs', 'Fakülte, bölüm ve programlar hakkında bilgiler', 'School', '#4169e1');
INSERT INTO public.information_categories VALUES ('events', 'Events', 'Etkinlikler', 'Campus events and academic calendar', 'Kampüsteki etkinlikler ve akademik takvim', 'Event', '#ff6347');
INSERT INTO public.information_categories VALUES ('resources', 'Resources', 'Kaynaklar', 'Access to library and online resources', 'Kütüphane ve çevrimiçi kaynaklara erişim', 'LibraryBooks', '#2ecc71');
INSERT INTO public.information_categories VALUES ('student', 'Student Life', 'Öğrenci Hayatı', 'Information about student clubs and services', 'Öğrenci kulüpleri ve hizmetleri hakkında bilgiler', 'People', '#9b59b6');
INSERT INTO public.information_categories VALUES ('campus', 'Campus', 'Kampüs', 'Campus map and information about facilities', 'Kampüs haritası ve tesisler hakkında bilgiler', 'Map', '#f1c40f');
INSERT INTO public.information_categories VALUES ('contact', 'Contact', 'İletişim', 'Contact information for departments and administrative offices', 'Bölümler ve idari ofislerle iletişim bilgileri', 'Info', '#3498db');
INSERT INTO public.information_categories VALUES ('facilities', 'Campus Facilities', 'Kampüs Tesisleri', 'Information about university facilities and amenities', 'Üniversite tesisleri ve imkanları hakkında bilgiler', 'Map', '#2196F3');


--
-- Data for Name: information_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.information_items VALUES (1, 'academic', 'Faculties', 'Fakülteler', 'Detailed information about all faculties and programs at our university.', 'Üniversitemizdeki tüm fakülteler ve programlar hakkında detaylı bilgiler.', 1);
INSERT INTO public.information_items VALUES (2, 'academic', 'Departments', 'Bölümler', 'List of departments within faculties and their educational programs.', 'Fakültelere bağlı bölümlerin listesi ve eğitim programları.', 2);
INSERT INTO public.information_items VALUES (3, 'academic', 'Programs', 'Programlar', 'Information about undergraduate, graduate, and doctoral programs.', 'Lisans, yüksek lisans ve doktora programlarımız hakkında bilgi.', 3);
INSERT INTO public.information_items VALUES (4, 'events', 'Upcoming Events', 'Yaklaşan Etkinlikler', 'Conferences, seminars, and other events taking place in the coming weeks.', 'Önümüzdeki haftalarda gerçekleşecek konferans, seminer ve diğer etkinlikler.', 1);
INSERT INTO public.information_items VALUES (5, 'events', 'Academic Calendar', 'Akademik Takvim', 'Academic calendar including registration, exam periods, and holidays.', 'Kayıt, sınav ve tatil dönemlerini içeren akademik takvim.', 2);
INSERT INTO public.information_items VALUES (6, 'resources', 'Library', 'Kütüphane', 'Library hours and accessible resources.', 'Kütüphane çalışma saatleri ve erişilebilir kaynaklar.', 1);
INSERT INTO public.information_items VALUES (7, 'resources', 'Online Resources', 'Çevrimiçi Kaynaklar', 'Digital resources and databases available to students.', 'Öğrencilerin erişebileceği dijital kaynaklar ve veritabanları.', 2);
INSERT INTO public.information_items VALUES (8, 'student', 'Student Clubs', 'Öğrenci Kulüpleri', 'Active student clubs on campus and their activities.', 'Kampüsteki aktif öğrenci kulüpleri ve etkinlikleri.', 1);
INSERT INTO public.information_items VALUES (9, 'student', 'Student Services', 'Öğrenci Hizmetleri', 'Information about health, housing, food, and transportation services.', 'Sağlık, barınma, yemek ve ulaşım hizmetleri hakkında bilgi.', 2);
INSERT INTO public.information_items VALUES (10, 'campus', 'Campus Map', 'Kampüs Haritası', 'Building locations and campus directions.', 'Binaların konumları ve kampüs içi yönlendirmeler.', 1);
INSERT INTO public.information_items VALUES (11, 'campus', 'Facilities', 'Tesisler', 'Sports facilities, dining halls, cafeterias, and other facilities.', 'Spor tesisleri, yemekhane, kafeterya ve diğer tesisler.', 2);
INSERT INTO public.information_items VALUES (12, 'contact', 'Department Contacts', 'Bölümlerle İletişim', 'Contact information for academic departments.', 'Akademik bölümlerin iletişim bilgileri.', 1);
INSERT INTO public.information_items VALUES (13, 'contact', 'Administrative Offices', 'İdari Ofisler', 'University administrative offices and contact information.', 'Üniversite idari ofisleri ve iletişim bilgileri.', 2);
INSERT INTO public.information_items VALUES (17, 'events', 'Cultural Exchange Week', 'Kültürel Değişim Haftası', 'A week-long celebration of cultures featuring exhibitions, performances, and workshops from various countries.', 'Çeşitli ülkelerden sergiler, performanslar ve atölye çalışmaları içeren bir hafta süreli kültür kutlaması.', 40);
INSERT INTO public.information_items VALUES (19, 'facilities', 'Sports Complex', 'Spor Kompleksi', 'State-of-the-art sports facilities including an Olympic-size swimming pool, fitness center, basketball courts, and soccer field.', 'Olimpik yüzme havuzu, fitness merkezi, basketbol sahaları ve futbol sahası içeren son teknoloji spor tesisleri.', 10);
INSERT INTO public.information_items VALUES (20, 'facilities', 'Student Center', 'Öğrenci Merkezi', 'A hub for student activities featuring lounges, meeting rooms, dining options, and recreational spaces.', 'Öğrenci etkinlikleri için dinlenme alanları, toplantı odaları, yemek seçenekleri ve rekreasyon alanları içeren bir merkez.', 20);
INSERT INTO public.information_items VALUES (21, 'facilities', 'Research Laboratories', 'Araştırma Laboratuvarları', 'Advanced research laboratories equipped with cutting-edge technology for scientific research and experimentation.', 'Bilimsel araştırma ve deney için en son teknolojiyle donatılmış gelişmiş araştırma laboratuvarları.', 30);


--
-- Data for Name: information_subitems; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.information_subitems VALUES (1, 1, 'Fall Semester', 'Güz Dönemi', 'Fall semester typically runs from September to January.', 'Güz dönemi genellikle Eylül ayından Ocak ayına kadar sürer.', 1);
INSERT INTO public.information_subitems VALUES (2, 1, 'Spring Semester', 'Bahar Dönemi', 'Spring semester typically runs from February to June.', 'Bahar dönemi genellikle Şubat ayından Haziran ayına kadar sürer.', 2);
INSERT INTO public.information_subitems VALUES (3, 1, 'Summer School', 'Yaz Okulu', 'Summer school is offered in July and August.', 'Yaz okulu Temmuz ve Ağustos aylarında sunulmaktadır.', 3);
INSERT INTO public.information_subitems VALUES (4, 2, 'New Students', 'Yeni Öğrenciler', 'New students must register in person at the registrar office.', 'Yeni öğrenciler kayıt ofisinde şahsen kayıt yaptırmalıdır.', 1);
INSERT INTO public.information_subitems VALUES (5, 2, 'Continuing Students', 'Devam Eden Öğrenciler', 'Continuing students can register online through the student portal.', 'Devam eden öğrenciler öğrenci portalı üzerinden çevrimiçi kayıt yapabilirler.', 2);
INSERT INTO public.information_subitems VALUES (6, 2, 'Late Registration', 'Geç Kayıt', 'Late registration incurs additional fees and requires approval.', 'Geç kayıt ek ücretlere tabidir ve onay gerektirir.', 3);
INSERT INTO public.information_subitems VALUES (7, 5, 'Borrowing Books', 'Kitap Ödünç Alma', 'Students can borrow up to 5 books for 2 weeks.', 'Öğrenciler 2 haftalığına 5 kitaba kadar ödünç alabilirler.', 1);
INSERT INTO public.information_subitems VALUES (8, 5, 'Study Rooms', 'Çalışma Odaları', 'Study rooms can be reserved online up to 2 days in advance.', 'Çalışma odaları 2 gün öncesine kadar çevrimiçi olarak rezerve edilebilir.', 2);
INSERT INTO public.information_subitems VALUES (9, 5, 'Online Resources', 'Çevrimiçi Kaynaklar', 'Access journals and e-books through the library portal.', 'Kütüphane portalı üzerinden dergilere ve e-kitaplara erişin.', 3);
INSERT INTO public.information_subitems VALUES (10, 8, 'Academic Integrity', 'Akademik Dürüstlük', 'Plagiarism and cheating are strictly prohibited and may result in expulsion.', 'İntihal ve kopya kesinlikle yasaktır ve okuldan atılmaya neden olabilir.', 1);
INSERT INTO public.information_subitems VALUES (11, 8, 'Attendance Policy', 'Devam Politikası', 'Students must attend at least 70% of classes to be eligible for exams.', 'Öğrenciler sınavlara girebilmek için derslerin en az %70\ine katılmalıdır.', 2);
INSERT INTO public.information_subitems VALUES (12, 8, 'Grading System', 'Not Sistemi', 'The university uses a letter grading system from A to F.', 'Üniversite A\dan F\ye kadar bir harf notlandırma sistemi kullanır.', 3);
INSERT INTO public.information_subitems VALUES (13, 1, 'Festival Schedule', 'Festival Programı', 'Day 1: Opening ceremony (10:00-11:00), Music performances (11:30-18:00), Food stalls (All day)\nDay 2: Student performances (10:00-15:00), Alumni gathering (16:00-18:00)\nDay 3: Closing ceremony and fireworks (19:00-21:00)', 'Gün 1: Açılış töreni (10:00-11:00), Müzik performansları (11:30-18:00), Yemek stantları (Tüm gün)\nGün 2: Öğrenci performansları (10:00-15:00), Mezunlar buluşması (16:00-18:00)\nGün 3: Kapanış töreni ve havai fişek gösterisi (19:00-21:00)', 10);
INSERT INTO public.information_subitems VALUES (14, 1, 'Festival Locations', 'Festival Mekanları', 'Main Stage: Central Campus Square\nFood Court: Behind the Student Center\nArt Exhibitions: Fine Arts Building, Ground Floor\nActivities Area: Sports Field', 'Ana Sahne: Merkez Kampüs Meydanı\nYemek Alanı: Öğrenci Merkezi Arkası\nSanat Sergileri: Güzel Sanatlar Binası, Zemin Kat\nEtkinlik Alanı: Spor Sahası', 20);
INSERT INTO public.information_subitems VALUES (15, 1, 'Registration Info', 'Kayıt Bilgileri', 'Registration is required for certain workshops. Visit the festival website or the Student Affairs Office to register.', 'Belirli atölye çalışmaları için kayıt gereklidir. Kayıt olmak için festival web sitesini ziyaret edin veya Öğrenci İşleri Ofisine başvurun.', 30);
INSERT INTO public.information_subitems VALUES (16, 2, 'Participating Companies', 'Katılan Şirketler', 'Tech Sector: Google, Microsoft, Apple, IBM\nFinance: Goldman Sachs, Morgan Stanley, JP Morgan\nEngineering: Siemens, General Electric, Lockheed Martin\nConsulting: McKinsey, BCG, Deloitte', 'Teknoloji Sektörü: Google, Microsoft, Apple, IBM\nFinans: Goldman Sachs, Morgan Stanley, JP Morgan\nMühendislik: Siemens, General Electric, Lockheed Martin\nDanışmanlık: McKinsey, BCG, Deloitte', 10);
INSERT INTO public.information_subitems VALUES (17, 2, 'Preparation Tips', 'Hazırlık İpuçları', '1. Update your resume and bring multiple copies\n2. Research companies you''re interested in\n3. Prepare a brief introduction about yourself\n4. Dress professionally\n5. Prepare questions to ask recruiters', '1. Özgeçmişinizi güncelleyin ve birden fazla kopya getirin\n2. İlgilendiğiniz şirketler hakkında araştırma yapın\n3. Kendiniz hakkında kısa bir tanıtım hazırlayın\n4. Profesyonel giyinin\n5. İşe alım görevlilerine sormak için sorular hazırlayın', 20);
INSERT INTO public.information_subitems VALUES (18, 2, 'Workshop Schedule', 'Atölye Programı', 'Resume Building Workshop: 10:00-11:00, Room A101\nInterview Skills: 12:00-13:00, Room B202\nNetworking Strategies: 14:00-15:00, Room C303\nJob Search in Digital Age: 16:00-17:00, Room D404', 'Özgeçmiş Hazırlama Atölyesi: 10:00-11:00, Oda A101\nMülakat Becerileri: 12:00-13:00, Oda B202\nNetwork Stratejileri: 14:00-15:00, Oda C303\nDijital Çağda İş Arama: 16:00-17:00, Oda D404', 30);
INSERT INTO public.information_subitems VALUES (19, 3, 'Keynote Speakers', 'Ana Konuşmacılar', 'Dr. Jane Smith (MIT): "Future of Artificial Intelligence"\nProf. Robert Johnson (Oxford): "Climate Change Solutions"\nDr. Maria Garcia (Stanford): "Advances in Biotechnology"\nProf. Ahmed Hassan (Tokyo University): "Quantum Computing Applications"', 'Dr. Jane Smith (MIT): "Yapay Zekanın Geleceği"\nProf. Robert Johnson (Oxford): "İklim Değişikliği Çözümleri"\nDr. Maria Garcia (Stanford): "Biyoteknolojideki İlerlemeler"\nProf. Ahmed Hassan (Tokyo Üniversitesi): "Kuantum Bilişim Uygulamaları"', 10);
INSERT INTO public.information_subitems VALUES (20, 3, 'Conference Tracks', 'Konferans Oturumları', 'Track 1: Artificial Intelligence and Machine Learning\nTrack 2: Environmental Science and Sustainability\nTrack 3: Biomedical Research and Healthcare\nTrack 4: Advanced Computing and Data Science', 'Oturum 1: Yapay Zeka ve Makine Öğrenimi\nOturum 2: Çevre Bilimi ve Sürdürülebilirlik\nOturum 3: Biyomedikal Araştırmalar ve Sağlık Hizmetleri\nOturum 4: İleri Bilişim ve Veri Bilimi', 20);


--
-- Data for Name: menu_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.menu_items VALUES ('thesisPrinting', 'printing', 'Tez Baskı', 'Tez formatında özel baskı ve ciltleme', 50.00, 'https://images.unsplash.com/photo-1606171687430-338158c4f484', '2025-03-31 11:45:56.355811+00', '2025-03-31 11:45:56.355811+00');
INSERT INTO public.menu_items VALUES ('posterPrint', 'printing', 'Poster Baskı', 'A2 ve A1 boyutlarında poster baskı', 40.00, 'https://images.unsplash.com/photo-1617391765934-f7ac7aa648bc', '2025-03-31 11:45:56.355811+00', '2025-03-31 11:45:56.355811+00');
INSERT INTO public.menu_items VALUES ('documentScanning', 'printing', 'Doküman Tarama', 'Yüksek çözünürlüklü tarama hizmeti', 2.00, 'https://images.unsplash.com/photo-1581089781785-603411fa81f5', '2025-03-31 11:45:56.355811+00', '2025-03-31 11:45:56.355811+00');
INSERT INTO public.menu_items VALUES ('calculator', 'academic', 'Bilimsel Hesap Makinesi', 'Sınavlarda kullanıma uygun hesap makinesi', 250.00, 'https://images.unsplash.com/photo-1574607383476-f517f260d30b', '2025-03-31 11:45:56.355811+00', '2025-03-31 11:45:56.355811+00');
INSERT INTO public.menu_items VALUES ('labCoat', 'academic', 'Laboratuvar Önlüğü', 'Beyaz, %100 pamuk laboratuvar önlüğü', 120.00, 'https://images.unsplash.com/photo-1626315869436-d6989dd85910', '2025-03-31 11:45:56.355811+00', '2025-03-31 11:45:56.355811+00');
INSERT INTO public.menu_items VALUES ('drawingSet', 'academic', 'Teknik Çizim Seti', 'Mühendislik çizimleri için teknik set', 180.00, 'https://images.unsplash.com/photo-1583321500900-82807e458f3c', '2025-03-31 11:45:56.355811+00', '2025-03-31 11:45:56.355811+00');
INSERT INTO public.menu_items VALUES ('latte', 'coffee', 'Latte', 'Espresso ve buharla ısıtılmış süt', 100.00, 'https://images.unsplash.com/photo-1489866492941-15d60bdaa7e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGF0dGV8ZW58MHwwfDB8fHwy', '2025-03-31 10:25:26.78148+00', '2025-03-31 10:25:26.78148+00');
INSERT INTO public.menu_items VALUES ('mocha', 'coffee', 'Mocha', 'Espresso, sıcak çikolata ve süt', 110.00, 'https://images.unsplash.com/photo-1513244608388-32427255be63?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9jaGF8ZW58MHwwfDB8fHwy', '2025-03-31 11:45:56.355811+00', '2025-03-31 11:45:56.355811+00');
INSERT INTO public.menu_items VALUES ('salad', 'cafeteria', 'Mevsim Salatası', 'Mevsim sebzeleri ile hazırlanmış salata', 130.00, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd', '2025-03-31 10:25:26.78148+00', '2025-03-31 10:25:26.78148+00');
INSERT INTO public.menu_items VALUES ('sandwich', 'cafeteria', 'Sandviç', 'Taze ekmek ile hazırlanmış tavuk/peynir sandviç', 160.00, 'https://images.unsplash.com/photo-1509722747041-616f39b57569', '2025-03-31 10:25:26.78148+00', '2025-03-31 10:25:26.78148+00');
INSERT INTO public.menu_items VALUES ('americano', 'coffee', 'Americano', 'Sıcak su ile inceltilmiş espresso', 100.00, 'https://images.unsplash.com/photo-1504417335905-7d7bfe044558?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW1lcmljYW5vfGVufDB8MHwwfHx8Mg%3D%3D', '2025-03-31 11:45:56.355811+00', '2025-03-31 11:45:56.355811+00');
INSERT INTO public.menu_items VALUES ('cappuccino', 'coffee', 'Cappuccino', 'İtalyan usulü cappuccino', 110.00, 'https://images.unsplash.com/photo-1525797559391-d6c6fd668582?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FwcHVjaW5vfGVufDB8MHwwfHx8Mg%3D%3D', '2025-03-31 11:45:56.355811+00', '2025-03-31 11:45:56.355811+00');
INSERT INTO public.menu_items VALUES ('chickenRice', 'cafeteria', 'Tavuklu Pilav', 'Özel baharatlı tavuk parçaları ile pilav', 180.00, 'https://images.unsplash.com/photo-1569058242252-623df46b5025?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpY2tlbiUyMHJpY2V8ZW58MHwwfDB8fHwy', '2025-03-31 11:45:56.355811+00', '2025-03-31 11:45:56.355811+00');
INSERT INTO public.menu_items VALUES ('lasagna', 'cafeteria', 'Lazanya', 'Özel tarif ile hazırlanmış et soslu lazanya', 200.00, 'https://images.unsplash.com/photo-1621510456681-2330135e5871?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFzYWduYXxlbnwwfDB8MHx8fDI%3D', '2025-03-31 11:45:56.355811+00', '2025-03-31 11:45:56.355811+00');
INSERT INTO public.menu_items VALUES ('turkishCoffee', 'coffee', 'Türk Kahvesi', 'Geleneksel hazırlanmış Türk kahvesi', 90.00, 'https://images.unsplash.com/photo-1630620276854-c68ae3b47678?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dCVDMyVCQ3JrJTIwa2FodmVzaXxlbnwwfDB8MHx8fDI%3D', '2025-03-31 10:25:26.78148+00', '2025-03-31 10:25:26.78148+00');
INSERT INTO public.menu_items VALUES ('veggiePasta', 'cafeteria', 'Sebzeli Makarna', 'Taze sebzeler ve krema soslu makarna', 190.00, 'https://images.unsplash.com/photo-1724365858492-743b85c95ac4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFzdGElMjB3aXRoJTIwdmVnZXRhYmxlc3xlbnwwfDB8MHx8fDI%3D', '2025-03-31 11:45:56.355811+00', '2025-03-31 11:45:56.355811+00');


--
-- Data for Name: professor_rooms; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.professor_rooms VALUES ('5f6f3ab9-1b31-4791-ae2a-ff613611daa2', 'Prof. Dr. John Smith', 'A-101', '1st Floor', 'Computer Engineering', 'Monday 10:00-12:00, Wednesday 14:00-16:00', 'acfd1492-7cd8-4de0-bba3-fcfdda9c7402', '2025-03-31 12:04:02.210119+00');
INSERT INTO public.professor_rooms VALUES ('2b7f3032-7e67-4d3c-9b13-f99bcb8f7392', 'Dr. Michael Brown', 'A-304', '3rd Floor', 'Artificial Intelligence', 'Monday 13:00-15:00, Friday 10:00-12:00', 'acfd1492-7cd8-4de0-bba3-fcfdda9c7402', '2025-03-31 12:04:02.210119+00');
INSERT INTO public.professor_rooms VALUES ('09ea4936-d573-4624-bd4d-802524a31528', 'Prof. Dr. Emily Davis', 'C-401', '4th Floor', 'Data Science', 'Wednesday 10:00-12:00, Friday 14:00-16:00', '7e59f0d2-3f1b-4ccd-af6d-17910f64fd4c', '2025-03-31 12:04:02.210119+00');


--
-- Data for Name: professors; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.professors VALUES ('67beeb1b-e808-4449-996b-74ab42f7a2ac', 'Prof.Dr.', 'İsmihan BAYRAMOĞLU', 'Fen Edebiyat Fak.', 'Matematik', '9878', 'A', '4', '424', NULL, NULL);
INSERT INTO public.professors VALUES ('bd6702e5-a043-4397-a8c8-e3fb0bf61866', 'Prof.Dr.', 'Gözde Yazgı TÜTÜNCÜ AŞÇI', 'Fen Edebiyat Fak.', 'Matematik', '8478', 'A', '5', '524', NULL, NULL);
INSERT INTO public.professors VALUES ('d6b1ec47-5450-4c18-83fa-7700d06b61a3', 'Doç.Dr.', 'Sevin GÜMGÜM', 'Fen Edebiyat Fak.', 'Matematik', '8307', 'A', '4', '426', NULL, NULL);
INSERT INTO public.professors VALUES ('d9c26856-af89-42cb-8b3b-2f40004fca56', 'Prof.Dr.', 'İsmihan BAYRAMOĞLU', 'Fen Edebiyat Fak.', 'Matematik', '9878', 'A', '4', '424', NULL, NULL);
INSERT INTO public.professors VALUES ('03685e2a-c8c4-4233-932c-ebca4a2159f8', 'Prof.Dr.', 'Gözde Yazgı TÜTÜNCÜ AŞÇI', 'Fen Edebiyat Fak.', 'Matematik', '8478', 'A', '5', '524', NULL, NULL);
INSERT INTO public.professors VALUES ('d99b42b4-7da8-42e5-864d-e5de1a7655bf', 'Doç.Dr.', 'Sevin GÜMGÜM', 'Fen Edebiyat Fak.', 'Matematik', '8307', 'A', '4', '426', NULL, NULL);
INSERT INTO public.professors VALUES ('aac08c75-b83b-4a03-ab78-ccf17687e385', 'Doç.Dr.', 'Cemal Murat ÖZKUT', 'Fen Edebiyat Fak.', 'Matematik', '8466', 'A', '4', '429', NULL, NULL);
INSERT INTO public.professors VALUES ('b76c466e-279a-451a-9811-254dcb4beb3b', 'Dr.Öğr.Üyesi', 'Demet ÖZDEK', 'Fen Edebiyat Fak.', 'Matematik', '5129', 'A', '4', '421', NULL, NULL);
INSERT INTO public.professors VALUES ('98836c71-7f25-4d8e-9393-3c456805ea73', 'Dr.Öğr.Üyesi', 'Necla KOÇHAN', 'Fen Edebiyat Fak.', 'Matematik', '8397', 'A', '5', '524', NULL, NULL);
INSERT INTO public.professors VALUES ('25cac4da-c620-4eb6-9c89-9d37f10aba03', 'Dr.Öğr.Üyesi', 'Neslişah İMAMOĞLU KARABAŞ', 'Fen Edebiyat Fak.', 'Matematik', '5805', 'A', '4', '427', NULL, NULL);
INSERT INTO public.professors VALUES ('fa01f660-ab37-4ffd-b86e-34b5f45dd6d3', 'Araş.Gör.', 'Ayşe BELER', 'Fen Edebiyat Fak.', 'Matematik', '8309', 'A', '4', '427', NULL, NULL);
INSERT INTO public.professors VALUES ('70225e04-66ca-4883-8235-e515bcf42322', 'Araş.Gör.', 'Merve KAHRAMAN ARİMAN', 'Fen Edebiyat Fak.', 'Matematik', '8497', 'A', '5', '527', NULL, NULL);
INSERT INTO public.professors VALUES ('104cad58-f65e-426b-8fd8-2022dea69ef4', 'Araş.Gör.', 'Sıla Selenay KOÇ', 'Fen Edebiyat Fak.', 'Matematik', '8352', 'A', '5', '527', NULL, NULL);
INSERT INTO public.professors VALUES ('0fe9a308-ec9b-474b-acde-bfffe41ac7da', 'Prof.Dr.', 'Neslihan YETKİNER', 'Fen Edebiyat Fak.', 'İngilizce Mütercim ve Tercümanlık', '8139', 'A', '4', '422', NULL, NULL);
INSERT INTO public.professors VALUES ('9aa868d4-115f-465a-abec-dd4054d96d24', 'Prof.Dr.', 'Nihal YETKİN KARAKOÇ', 'Fen Edebiyat Fak.', 'İngilizce Mütercim ve Tercümanlık', '8521', 'A', '4', '425', NULL, NULL);
INSERT INTO public.professors VALUES ('c6f72f2c-e215-47e0-af4c-ab6e81bdf877', 'Dr.Öğr.Üyesi', 'Olcay Şener ERKIRTAY', 'Fen Edebiyat Fak.', 'İngilizce Mütercim ve Tercümanlık', '5531', 'A', '4', '427', NULL, NULL);
INSERT INTO public.professors VALUES ('cc293a23-01e4-4897-8692-47e6da957ee8', 'Dr.Öğr.Üyesi', 'Ilgın AKTENER', 'Fen Edebiyat Fak.', 'İngilizce Mütercim ve Tercümanlık', '8503', 'A', '4', '421', NULL, NULL);
INSERT INTO public.professors VALUES ('90319976-5bde-44fd-9af8-8b8512769dc0', 'Dr.Öğr.Üyesi', 'Gülden TANER', 'Fen Edebiyat Fak.', 'İngilizce Mütercim ve Tercümanlık', '8411', 'A', '5', '505', NULL, NULL);
INSERT INTO public.professors VALUES ('0f0d66e8-476b-42af-a20f-36d2db4aff9a', 'Öğr.Gör.', 'Nilgün DUNGAN JR', 'Fen Edebiyat Fak.', 'İngilizce Mütercim ve Tercümanlık', '8412', 'A', '5', '524', NULL, NULL);
INSERT INTO public.professors VALUES ('73bdb3fc-022c-494b-b7be-59f0ff708ee4', 'Araş.Gör.', 'Nazlıgül BOZOK', 'Fen Edebiyat Fak.', 'İngilizce Mütercim ve Tercümanlık', '8507', 'A', '5', '531', NULL, NULL);
INSERT INTO public.professors VALUES ('20a408ef-a4ab-4b81-b01b-eebdceb015da', 'Araş.Gör.', 'Yaşar AKGÜN', 'Fen Edebiyat Fak.', 'İngilizce Mütercim ve Tercümanlık', '8369', 'A', '5', '527', NULL, NULL);
INSERT INTO public.professors VALUES ('1bd290c3-a74f-45d1-b894-49d8e05a9b66', 'Araş.Gör.', 'Aslı Melike SOYLU', 'Fen Edebiyat Fak.', 'İngilizce Mütercim ve Tercümanlık', '8146', 'A', '5', '528', NULL, NULL);
INSERT INTO public.professors VALUES ('4bc9b334-5abd-41e8-8987-83f196153447', 'Prof.Dr.', 'Canan BAŞAR', 'Fen Edebiyat Fak.', 'Psikoloji', '8193', 'A', '5', '526', NULL, NULL);
INSERT INTO public.professors VALUES ('7dba5708-524c-4178-91ec-cee1150b935b', 'Prof.Dr.', 'Seda DURAL ÇETİNKAYA', 'Fen Edebiyat Fak.', 'Psikoloji', '8542', 'A', '4', '430', NULL, NULL);
INSERT INTO public.professors VALUES ('0450bb64-4fe0-44c9-906b-aa39a09f94e4', 'Prof.Dr.', 'Mustafa Falih KÖKSAL', 'Fen Edebiyat Fak.', 'Psikoloji', '8534', 'A', '5', '505', NULL, NULL);
INSERT INTO public.professors VALUES ('c6a4ca9a-760b-4ed7-bed9-a31adf67b5a6', 'Prof.Dr.', 'Seda CAN', 'Fen Edebiyat Fak.', 'Psikoloji', '8352', 'A', '5', '529', NULL, NULL);
INSERT INTO public.professors VALUES ('be62288d-59a0-48c2-b5f1-344636bd7ba2', 'Doç.Dr.', 'Burak ERDENİZ', 'Fen Edebiyat Fak.', 'Psikoloji', '8379', 'A', '4', '529', NULL, NULL);
INSERT INTO public.professors VALUES ('44100692-84ec-45c5-94fe-f3c6b882ab55', 'Doç.Dr.', 'Ezgi TUNA KAYKUSUZ', 'Fen Edebiyat Fak.', 'Psikoloji', '8385', 'A', '4', '428', NULL, NULL);
INSERT INTO public.professors VALUES ('784dda8f-d431-44ef-ab23-0325cfa55b1f', 'Dr.Öğr.Üyesi', 'Nevra ERSOY', 'Fen Edebiyat Fak.', 'Psikoloji', '9862', 'A', '5', '530', NULL, NULL);
INSERT INTO public.professors VALUES ('93751ca3-6d43-476d-9473-382f76345160', 'Dr.Öğr.Üyesi', 'Yasemin MERAL ÖĞÜTCÜ', 'Fen Edebiyat Fak.', 'Psikoloji', '8580', 'A', '5', '530', NULL, NULL);
INSERT INTO public.professors VALUES ('31edb844-07bd-478e-9b61-53047e98a700', 'Dr.Öğr.Üyesi', 'Ezgi GÜR', 'Fen Edebiyat Fak.', 'Psikoloji', '8234', 'A', '4', '430', NULL, NULL);
INSERT INTO public.professors VALUES ('b9f8f118-13d7-48b9-a85d-551a720b98e7', 'Dr.Öğr.Üyesi', 'Aylin KOÇAK ŞEN', 'Fen Edebiyat Fak.', 'Psikoloji', '8235', 'A', '5', '530', NULL, NULL);
INSERT INTO public.professors VALUES ('f822bf79-c251-4e84-afd8-706adb3d1d0a', 'Araş.Gör.', 'Merve BULUT', 'Fen Edebiyat Fak.', 'Psikoloji', '8220', 'A', '-2', '2B03', NULL, NULL);
INSERT INTO public.professors VALUES ('7ce03f9a-cb05-4f2c-81c0-98959d5208f1', 'Araş.Gör.', 'Günce YAVUZ ERGİYEN', 'Fen Edebiyat Fak.', 'Psikoloji', '8227', 'A', '5', '528', NULL, NULL);
INSERT INTO public.professors VALUES ('eb5e4511-52ca-406d-84c2-abb4721c74ee', 'Araş.Gör.', 'Seda ORPAK', 'Fen Edebiyat Fak.', 'Psikoloji', '8494', 'A', '5', '528', NULL, NULL);
INSERT INTO public.professors VALUES ('0114a071-a247-4baf-b243-df6e784e1f23', 'Araş.Gör.', 'Tolga ERGİYEN', 'Fen Edebiyat Fak.', 'Psikoloji', '8495', 'A', '5', '528', NULL, NULL);
INSERT INTO public.professors VALUES ('0cbed755-ad20-4dd8-99ea-68b45d01de57', 'Araş.Gör.', 'İlayda KORKUT', 'Fen Edebiyat Fak.', 'Psikoloji', '5102', 'A', '-2', '2B03', NULL, NULL);
INSERT INTO public.professors VALUES ('2355f531-ae5f-4843-bc98-52d1cb60cd22', 'Araş.Gör.', 'Ezgi Uncu', 'Fen Edebiyat Fak.', 'Psikoloji', '5428', 'A', '5', '531', NULL, NULL);
INSERT INTO public.professors VALUES ('6d4f8bef-d03e-4b93-bf7b-1b400741e6eb', 'Prof.Dr.', 'Hayriye ÖZEN', 'Fen Edebiyat Fak.', 'Sosyoloji', '9831', 'A', '4', '429', NULL, NULL);
INSERT INTO public.professors VALUES ('00afc232-af9f-4f60-b49c-bc863f31f4c9', 'Prof.Dr.', 'Hatice Deniz YÜKSEKER TEKİN', 'Fen Edebiyat Fak.', 'Sosyoloji', '5894', 'A', '4', '431', NULL, NULL);
INSERT INTO public.professors VALUES ('e18eeb0c-aaa6-4d08-a5e6-eaed40c2a066', 'Doç.Dr.', 'Derya NİZAM BİLGİÇ', 'Fen Edebiyat Fak.', 'Sosyoloji', '8372', 'A', '5', '523', NULL, NULL);
INSERT INTO public.professors VALUES ('0dc91974-4973-4ddf-9656-94db3e867112', 'Dr.Öğr.Üyesi', 'Seher ŞEN', 'Fen Edebiyat Fak.', 'Sosyoloji', '8326', 'A', '5', '505', NULL, NULL);
INSERT INTO public.professors VALUES ('6ad53c9c-14ed-450f-be42-f6e82d8add2a', 'Araş.Gör.', 'Borabay ERBAY', 'Fen Edebiyat Fak.', 'Sosyoloji', '8496', 'A', '5', '531', NULL, NULL);
INSERT INTO public.professors VALUES ('1f94d4d4-f027-44b6-ad2d-a142231e64c1', 'Araş.Gör.', 'Helin Kardelen KAVUŞ', 'Fen Edebiyat Fak.', 'Sosyoloji', '8522', 'A', '5', '527', NULL, NULL);
INSERT INTO public.professors VALUES ('31a60183-c7fe-41e0-a5fd-46327d7c6456', 'Prof.Dr.', 'Abbas Kenan ÇİFTÇİ', 'Fen Edebiyat Fak.', 'Fizik', '8346', 'A', '4', '423', NULL, NULL);
INSERT INTO public.professors VALUES ('f3e091d3-f33d-41bd-86ef-bd0ef0665d93', 'Prof.Dr.', 'Gürsoy Bozkurt AKGÜÇ', 'Fen Edebiyat Fak.', 'Fizik', '8299', 'A', '5', '525', NULL, NULL);
INSERT INTO public.professors VALUES ('92792fb0-9890-4479-b60e-fb8b205c2c4d', 'Prof.Dr.', 'Uğur TIRNAKLI', 'Fen Edebiyat Fak.', 'Fizik', '8498', 'A', '5', '523', NULL, NULL);
INSERT INTO public.professors VALUES ('001aff32-daf3-4b01-809d-d4896b91afb2', 'Prof.Dr.', 'Göktuğ KARPAT', 'Fen Edebiyat Fak.', 'Fizik', '8352', 'A', '5', '529', NULL, NULL);
INSERT INTO public.professors VALUES ('97d1144f-b5c0-48fb-aa35-364def1d5ab9', 'Prof.Dr.', 'Ramazan Tuğrul SENGER', 'Fen Edebiyat Fak.', 'Fizik', '8402', 'A', '5', '525', NULL, NULL);
INSERT INTO public.professors VALUES ('7867c347-a2e0-48b6-9dc6-d0125facbde5', 'Dr.Öğr.Üyesi', 'Gökhan TORUN', 'Fen Edebiyat Fak.', 'Fizik', '8332', 'A', '4', '427', NULL, NULL);
INSERT INTO public.professors VALUES ('be61fcf7-9e96-421c-94e7-cb0bd6b1d912', 'Araş.Gör.', 'Hülya AYDIN KARAASLAN', 'Fen Edebiyat Fak.', 'Fizik', '8493', 'A', '5', '528', NULL, NULL);
INSERT INTO public.professors VALUES ('7fb21258-ca06-427b-8987-47f9f266f751', 'Araş.Gör.', 'Umutcan ŞAHİN', 'Fen Edebiyat Fak.', 'Fizik', '8161', 'A', '5', '531', NULL, NULL);
INSERT INTO public.professors VALUES ('0f65fdf4-1ecf-413a-8831-00641714e7fa', 'Prof.Dr.', 'Murat BENGİSU', 'Güzel Sanatlar ve Tasarım Fak.', 'Endüstriyel Tasarım', '5315', 'D', '5', '535', NULL, NULL);
INSERT INTO public.professors VALUES ('b2cdf292-2692-4e75-bec2-c8e6cc16ba7e', 'Doç.Dr.', 'Deniz DENİZ', 'Güzel Sanatlar ve Tasarım Fak.', 'Endüstriyel Tasarım', '5320', 'D', '5', '534', NULL, NULL);
INSERT INTO public.professors VALUES ('d77fad94-1ac6-4b1e-b0de-484f603f88e1', 'Doç.Dr.', 'Onur MENGİ', 'Güzel Sanatlar ve Tasarım Fak.', 'Endüstriyel Tasarım', '5405', 'D', '5', '503', NULL, NULL);
INSERT INTO public.professors VALUES ('1b1b6b46-369f-4504-adf2-1bb7ad9592d7', 'Dr.Öğr.Üyesi', 'Ahmet Can ÖZCAN', 'Güzel Sanatlar ve Tasarım Fak.', 'Endüstriyel Tasarım', '5305', 'D', '5', '538', NULL, NULL);
INSERT INTO public.professors VALUES ('b4deebc7-fc73-4e80-9453-3524421bcb2e', 'Dr.Öğr.Üyesi', 'Deniz SAYAR', 'Güzel Sanatlar ve Tasarım Fak.', 'Endüstriyel Tasarım', '5389', 'D', '4.5', '452', NULL, NULL);
INSERT INTO public.professors VALUES ('c05802ea-328c-49eb-8f0a-7c8fcfa18ef5', 'Dr.Öğr.Üyesi', 'Esra BİCİ NASIR', 'Güzel Sanatlar ve Tasarım Fak.', 'Endüstriyel Tasarım', '5337', 'D', '4.5', '465', NULL, NULL);
INSERT INTO public.professors VALUES ('f864a945-6381-43fe-93d1-560929addfd5', 'Dr.Öğr.Üyesi', 'Elif KOCABIYIK SAVASTA', 'Güzel Sanatlar ve Tasarım Fak.', 'Endüstriyel Tasarım', '5365', 'D', '5', '523', NULL, NULL);
INSERT INTO public.professors VALUES ('be4227ab-6964-4083-8cc6-964a8f751061', 'Öğr.Gör.Dr.', 'Derya IRKDAŞ DOĞU', 'Güzel Sanatlar ve Tasarım Fak.', 'Endüstriyel Tasarım', '5323', 'D', '3.5', '351', NULL, NULL);
INSERT INTO public.professors VALUES ('67577cf9-4059-483d-b4f0-1f5c7f8d5f17', 'Öğr.Gör.Dr.', 'Kardelen AYSEL', 'Güzel Sanatlar ve Tasarım Fak.', 'Endüstriyel Tasarım', '8294', 'D', '3.5', '352', NULL, NULL);
INSERT INTO public.professors VALUES ('f30244c4-2dd7-4c96-b505-98e0f7e34dd5', 'Araş.Gör.', 'Anıl Dinç DEMİRBİLEK', 'Güzel Sanatlar ve Tasarım Fak.', 'Endüstriyel Tasarım', '5411', 'D', '5', 'Açık Ofis', NULL, NULL);
INSERT INTO public.professors VALUES ('7992be5c-6ba9-48fd-a1af-135691e36af0', 'Araş.Gör.', 'Pakize İrem ERCAN', 'Güzel Sanatlar ve Tasarım Fak.', 'Endüstriyel Tasarım', '5400', 'D', '5', 'Açık Ofis', NULL, NULL);
INSERT INTO public.professors VALUES ('586e6f05-b334-4e64-92c6-597d61d3255d', 'Araş.Gör.', 'İkra GÜLER', 'Güzel Sanatlar ve Tasarım Fak.', 'Endüstriyel Tasarım', '8106', 'D', '5', 'Açık Ofis', NULL, NULL);
INSERT INTO public.professors VALUES ('9bacc60e-28f8-4316-ae16-e8938c105b92', 'Doç.Dr.', 'Zeynep ARDA', 'Güzel Sanatlar ve Tasarım Fak.', 'Görsel İletişim Tasarımı', '5324', 'D', '4.5', '353', NULL, NULL);
INSERT INTO public.professors VALUES ('54a970f5-7e7a-49fe-a2da-32ba109c2d54', 'Doç.Dr.', 'Gökhan MURA', 'Güzel Sanatlar ve Tasarım Fak.', 'Görsel İletişim Tasarımı', '5334', 'D', '5', '522', NULL, NULL);
INSERT INTO public.professors VALUES ('78467866-677d-4b51-bdec-a16d03be459c', 'Dr.Öğr.Üyesi', 'Rabia Özgül KILINÇARSLAN', 'Güzel Sanatlar ve Tasarım Fak.', 'Görsel İletişim Tasarımı', '5302', 'D', '4', '451', NULL, NULL);
INSERT INTO public.professors VALUES ('986cb6f2-cc58-4afa-a156-6de1f1473cdc', 'Dr.Öğr.Üyesi', 'Daniele SAVASTA', 'Güzel Sanatlar ve Tasarım Fak.', 'Görsel İletişim Tasarımı', '5337', 'D', '5', '536', NULL, NULL);
INSERT INTO public.professors VALUES ('c32bd25f-8c23-4878-91d2-320cb5ae02cf', 'Öğr.Gör.Dr.', 'Seda ÖZEN TANYILDIZI', 'Güzel Sanatlar ve Tasarım Fak.', 'Görsel İletişim Tasarımı', '5319', 'D', '4.5', '453', NULL, NULL);
INSERT INTO public.professors VALUES ('5d1ce6b1-44d3-4fd3-b558-0c18b713cf14', 'Öğr.Gör.', 'Emre YILDIZ', 'Güzel Sanatlar ve Tasarım Fak.', 'Görsel İletişim Tasarımı', '9842', 'D', '4.5', '454', NULL, NULL);
INSERT INTO public.professors VALUES ('ee845003-8970-4e71-9891-4b68711be9aa', 'Öğr.Gör.Dr.', 'Necati Toros MUTLU', 'Güzel Sanatlar ve Tasarım Fak.', 'Görsel İletişim Tasarımı', '5336', 'D', '4.5', '455', NULL, NULL);
INSERT INTO public.professors VALUES ('0198cd60-ad55-490d-bdd6-6749df99ba55', 'Öğr.Gör.', 'Can DERELİ', 'Güzel Sanatlar ve Tasarım Fak.', 'Görsel İletişim Tasarımı', '5427', 'D', '3.5', '351', NULL, NULL);
INSERT INTO public.professors VALUES ('8b4fb9ba-5ded-4507-9f55-feb0ac72a532', 'Araş.Gör.', 'Sena ADALI', 'Güzel Sanatlar ve Tasarım Fak.', 'Görsel İletişim Tasarımı', '5407', 'D', '5', 'Açık Ofis', NULL, NULL);
INSERT INTO public.professors VALUES ('06d914ce-c27e-48e4-9057-a3f1254b26b8', 'Araş.Gör.', 'Beyza Cennet BATIR', 'Güzel Sanatlar ve Tasarım Fak.', 'Görsel İletişim Tasarımı', '5408', 'D', '5', 'Açık Ofis', NULL, NULL);
INSERT INTO public.professors VALUES ('0b57e801-a3b6-40a4-913c-67f37076360c', 'Prof.Dr.', 'Deniz HASIRCI İNCEOĞLU', 'Güzel Sanatlar ve Tasarım Fak.', 'İçmimarlık ve Çevre Tasarımı', '5345', 'D', '5', '533', NULL, NULL);
INSERT INTO public.professors VALUES ('cd562781-98d9-4c5a-a13d-cbc89df26ae5', 'Doç.Dr.', 'Didem KAN KILIÇ', 'Güzel Sanatlar ve Tasarım Fak.', 'İçmimarlık ve Çevre Tasarımı', '5351', 'D', '3', '352', NULL, NULL);
INSERT INTO public.professors VALUES ('cbad5859-fb77-47f7-b123-02cca8b19235', 'Dr.Öğr.Üyesi', 'Didem YAVUZ VELİPAŞAOĞLU', 'Güzel Sanatlar ve Tasarım Fak.', 'İçmimarlık ve Çevre Tasarımı', '5375', 'D', '4.5', '463', NULL, NULL);
INSERT INTO public.professors VALUES ('50312153-ed85-4bb5-a5cc-f44de088f03f', 'Dr.Öğr.Üyesi', 'Markus WILSING', 'Güzel Sanatlar ve Tasarım Fak.', 'İçmimarlık ve Çevre Tasarımı', '5346', 'D', '5', '531', NULL, NULL);
INSERT INTO public.professors VALUES ('e8fba7d0-2273-4d58-92fc-3d26a9864d00', 'Dr.Öğr.Üyesi', 'Mustafa Emre ERGÜL', 'Güzel Sanatlar ve Tasarım Fak.', 'İçmimarlık ve Çevre Tasarımı', '5306', 'D', '5', '537', NULL, NULL);
INSERT INTO public.professors VALUES ('ed0be132-afda-4d19-87a2-dc21ce69a43e', 'Dr.Öğr.Üyesi', 'Ali ASLANKAN', 'Güzel Sanatlar ve Tasarım Fak.', 'İçmimarlık ve Çevre Tasarımı', '5333', 'D', '4.5', '504', NULL, NULL);
INSERT INTO public.professors VALUES ('33fb9ab2-6a64-40db-bb97-d2ed3c7427e8', 'Doç.Dr.', 'İpek KAŞTAŞ UZUN', 'Güzel Sanatlar ve Tasarım Fak.', 'İçmimarlık ve Çevre Tasarımı', '5343', 'D', '3.5', '355', NULL, NULL);
INSERT INTO public.professors VALUES ('980c8fbf-ae1a-48ef-9a6d-5f6f8be5b787', 'Dr.Öğr.Üyesi', 'Deniz AVCI HOSANLI', 'Güzel Sanatlar ve Tasarım Fak.', 'İçmimarlık ve Çevre Tasarımı', '5370', 'D', '4.5', '456', NULL, NULL);
INSERT INTO public.professors VALUES ('d2ad1d51-c230-40f1-9f7c-4ffde809d9f5', 'Dr.Öğr.Üyesi', 'Selin GÜLDEN', 'Güzel Sanatlar ve Tasarım Fak.', 'İçmimarlık ve Çevre Tasarımı', '5321', 'D', '3.5', '351', NULL, NULL);
INSERT INTO public.professors VALUES ('54cbc47e-e83a-41f3-8f8c-4a7755482698', 'Dr.Öğr.Üyesi', 'Meltem ERANIL', 'Güzel Sanatlar ve Tasarım Fak.', 'İçmimarlık ve Çevre Tasarımı', '8219', 'D', '4.5', '456', NULL, NULL);
INSERT INTO public.professors VALUES ('8aa6379f-fb83-4355-8888-e45ff0465152', 'Dr.Öğr.Üyesi', 'Gözde Damla TURHAN HASKARA', 'Güzel Sanatlar ve Tasarım Fak.', 'İçmimarlık ve Çevre Tasarımı', '5416', 'D', '4', '461', NULL, NULL);
INSERT INTO public.professors VALUES ('d00d43e6-6813-4215-b7f7-eddd4259cea1', 'Öğr.Gör.', 'Thomas G. KEOGH', 'Güzel Sanatlar ve Tasarım Fak.', 'İçmimarlık ve Çevre Tasarımı', '5350', 'D', '4.5', '463', NULL, NULL);
INSERT INTO public.professors VALUES ('116ac555-33d6-4384-b525-72e529947e76', 'Öğr.Gör.', 'Stefano PUGLIESE', 'Güzel Sanatlar ve Tasarım Fak.', 'İçmimarlık ve Çevre Tasarımı', '5363', 'D', '4.5', '453', NULL, NULL);
INSERT INTO public.professors VALUES ('cafd4a47-836d-4055-b0b6-fda5e1e12c57', 'Araş.Gör.', 'İdil BAKIR KÜÇÜKKAYA', 'Güzel Sanatlar ve Tasarım Fak.', 'İçmimarlık ve Çevre Tasarımı', '5403', 'D', '5', 'Açık Ofis', NULL, NULL);
INSERT INTO public.professors VALUES ('732bdf68-70f5-45ef-935c-cece8b020680', 'Araş.Gör.', 'Hande Yıldız ÇEKİNDİR', 'Güzel Sanatlar ve Tasarım Fak.', 'İçmimarlık ve Çevre Tasarımı', '5419', 'D', '5', 'Açık Ofis', NULL, NULL);
INSERT INTO public.professors VALUES ('b2369cce-7d54-44bd-b826-b4bc59f51978', 'Araş.Gör.', 'Yasemin ALBAYRAK KUTLAY', 'Güzel Sanatlar ve Tasarım Fak.', 'İçmimarlık ve Çevre Tasarımı', '5344', 'D', '5', 'Açık Ofis', NULL, NULL);
INSERT INTO public.professors VALUES ('a515f530-542e-4226-8b2f-b053a683a6a5', 'Araş.Gör.', 'Elif GÜNDOĞDU', 'Güzel Sanatlar ve Tasarım Fak.', 'İçmimarlık ve Çevre Tasarımı', '8110', 'D', '5', 'Açık Ofis', NULL, NULL);
INSERT INTO public.professors VALUES ('8a4e0831-92ac-4538-997b-a4333f078dad', 'Prof.Dr.', 'Ebru UZUNOĞLU', 'İletişim Fak.', 'Halkla İlişkiler ve Rek.', '8138', 'A', '5', '538', NULL, NULL);
INSERT INTO public.professors VALUES ('aade58a1-63c4-4b4a-9a12-259f07227eaa', 'Prof.Dr.', 'Sema KİP', 'İletişim Fak.', 'Halkla İlişkiler ve Rek.', '8328', 'A', '5', '509', NULL, NULL);
INSERT INTO public.professors VALUES ('72a64344-3784-4842-b28f-7a264055a591', 'Prof.Dr.', 'Selin TÜRKEL', 'İletişim Fak.', 'Halkla İlişkiler ve Rek.', '8431', 'A', '5', '514', NULL, NULL);
INSERT INTO public.professors VALUES ('e72743c5-5015-486b-bf4e-28f8a3390747', 'Doç.Dr.', 'Zeynep AKSOY', 'İletişim Fak.', 'Halkla İlişkiler ve Rek.', '8569', 'A', '5', '509', NULL, NULL);
INSERT INTO public.professors VALUES ('23cc5eca-80b5-43dc-8324-5890441ab5c6', 'Dr.Öğr.Üyesi', 'Pınar UMUL ÜNSAL', 'İletişim Fak.', 'Halkla İlişkiler ve Rek.', '8506', 'A', '5', '518', NULL, NULL);
INSERT INTO public.professors VALUES ('1156f04b-c63b-45ac-a49a-6957429cd2a7', 'Öğr.Gör.Dr.', 'Burak AMİRAK', 'İletişim Fak.', 'Halkla İlişkiler ve Rek.', '5114', 'A', '5', '506', NULL, NULL);
INSERT INTO public.professors VALUES ('b1f8bbc9-e2e2-4ee4-ba5c-cb7cd82ebcb4', 'Araş.Gör.', 'Aytunç ERÇİFCİ', 'İletişim Fak.', 'Halkla İlişkiler ve Rek.', '8147', 'A', '5', '510', NULL, NULL);
INSERT INTO public.professors VALUES ('971c454e-067e-4105-9043-c26d6193e93b', 'Araş.Gör.', 'Burcu YAMAN AKYAR', 'İletişim Fak.', 'Halkla İlişkiler ve Rek.', '8478', 'A', '5', '538', NULL, NULL);
INSERT INTO public.professors VALUES ('d03b5fb3-e349-43d3-9d80-e93d05e10358', 'Araş.Gör.', 'Serra EVCİ UYGUR', 'İletişim Fak.', 'Halkla İlişkiler ve Rek.', '8476', 'A', '5', '510', NULL, NULL);
INSERT INTO public.professors VALUES ('87fa263e-250b-423d-89e6-5329cf2fcd5d', 'Prof.Dr.', 'Yüksel Gökçen KARANFİL', 'İletişim Fak.', 'Yeni Medya ve İletişim', '8188', 'A', '5', '515', NULL, NULL);
INSERT INTO public.professors VALUES ('7e28a72d-8a2f-4a6b-a5ee-2df09704b439', 'Prof.Dr.', 'Burak DOĞU', 'İletişim Fak.', 'Yeni Medya ve İletişim', '5113', 'A', '5', '519', NULL, NULL);
INSERT INTO public.professors VALUES ('feb7100a-0326-4a18-abd6-c927c5e1c83a', 'Doç.Dr.', 'Aysun AKAN', 'İletişim Fak.', 'Yeni Medya ve İletişim', '8376', 'A', '5', '506', NULL, NULL);
INSERT INTO public.professors VALUES ('718e2c3a-6e43-473b-b959-71fdff947ce4', 'Doç.Dr.', 'Altuğ AKIN', 'İletişim Fak.', 'Yeni Medya ve İletişim', '5115', 'A', '5', '508', NULL, NULL);
INSERT INTO public.professors VALUES ('552bd609-4603-4e0c-ae2c-c4cc7d4e5068', 'Dr.Öğr.Üyesi', 'Sarphan UZUNOĞLU', 'İletişim Fak.', 'Yeni Medya ve İletişim', '8378', 'A', '5', '508', NULL, NULL);
INSERT INTO public.professors VALUES ('5a4d0793-d37b-490c-85ea-15ada8228686', 'Dr.Öğr.Üyesi', 'Ali Özgür GÜRSOY', 'İletişim Fak.', 'Yeni Medya ve İletişim', '9855', 'K', '1', '107', NULL, NULL);
INSERT INTO public.professors VALUES ('5088a3c4-7c84-4114-90ac-f1065c725537', 'Öğr.Gör.Dr.', 'Alper GEDİK', 'İletişim Fak.', 'Yeni Medya ve İletişim', '5112', 'K', '1', '115', NULL, NULL);
INSERT INTO public.professors VALUES ('ab1c1f55-4422-449c-b6dc-7b5daa82f133', 'Öğr.Gör.', 'Selçuk Hakan TUNCEL', 'İletişim Fak.', 'Yeni Medya ve İletişim', '5100', 'K', '1', '114', NULL, NULL);
INSERT INTO public.professors VALUES ('53cf8d46-4bcb-4b66-920c-456490084e89', 'Araş.Gör.', 'Saba ÇEVİK', 'İletişim Fak.', 'Yeni Medya ve İletişim', '5167', 'K', '1', '110', NULL, NULL);
INSERT INTO public.professors VALUES ('01a07894-18eb-4f1b-bab6-ee118c7e7921', 'Araş.Gör.', 'Cem Gökçen GÖKKAYA', 'İletişim Fak.', 'Yeni Medya ve İletişim', '8471', 'A', '5', '510', NULL, NULL);
INSERT INTO public.professors VALUES ('c2490b60-0453-49b0-812b-81d2c7b5c92f', 'Araş.Gör.', 'Sevda KAYA KİTİNUR', 'İletişim Fak.', 'Yeni Medya ve İletişim', '5131', 'K', '1', '113', NULL, NULL);
INSERT INTO public.professors VALUES ('674d9ac9-7301-4e23-b145-5f1a4dba3eec', 'Prof.Dr.', 'Ahmet GÜRATA', 'İletişim Fak.', 'Sinema ve Dijital Medya', '8430', 'A', '5', '513', NULL, NULL);
INSERT INTO public.professors VALUES ('da68f55b-ab65-4de7-96be-5e76e8a37be9', 'Dr.Öğr.Üyesi', 'Aras ÖZGÜN', 'İletişim Fak.', 'Sinema ve Dijital Medya', '9830', 'K', '1', '111', NULL, NULL);
INSERT INTO public.professors VALUES ('9110251d-9a56-49f0-9a45-4a209ca19db4', 'Dr.Öğr.Üyesi', 'Derya ÖZKAN', 'İletişim Fak.', 'Sinema ve Dijital Medya', '8453', 'A', '5', '512', NULL, NULL);
INSERT INTO public.professors VALUES ('f956bb10-418b-4237-8e01-594a2be06361', 'Dr.Öğr.Üyesi', 'Serkan ŞAVK', 'İletişim Fak.', 'Sinema ve Dijital Medya', '5108', 'K', '1', '107', NULL, NULL);
INSERT INTO public.professors VALUES ('9ddc97bc-2628-49c9-b258-3160f7b6648c', 'Öğr.Gör.', 'Hazal BAYAR', 'İletişim Fak.', 'Sinema ve Dijital Medya', '9830', 'K', '1', '111', NULL, NULL);
INSERT INTO public.professors VALUES ('9b2638f0-19f1-4fb6-a1e7-598c010e47ee', 'Araş.Gör.', 'Tuncer Mert AYDIN', 'İletişim Fak.', 'Sinema ve Dijital Medya', '8153', 'K', '1', '113', NULL, NULL);
INSERT INTO public.professors VALUES ('763b2269-13e9-47eb-910a-115ffd3b9a9e', 'Araş.Gör.', 'Sena KÜRKLÜ', 'İletişim Fak.', 'Sinema ve Dijital Medya', '8250', 'K', '1', '110', NULL, NULL);
INSERT INTO public.professors VALUES ('6fedc04c-c515-4397-8c4d-b09d2f45295d', 'Prof.Dr.', 'Ayla OĞUŞ BİNATLI', 'İşletme Fakültesi', 'Ekonomi', '8290', 'C', '7', '712', NULL, NULL);
INSERT INTO public.professors VALUES ('ec757e1f-77f4-48e1-bfac-fd4dbf09c90e', 'Prof.Dr.', 'İbrahim Hakan YETKİNER', 'İşletme Fakültesi', 'Ekonomi', '8248', 'C', '7', '728', NULL, NULL);
INSERT INTO public.professors VALUES ('23e2a1c3-3e0e-48c8-876b-cd740a0c0362', 'Prof.Dr.', 'Oğuz ESEN', 'İşletme Fakültesi', 'Ekonomi', '8584', 'C', '9', '906', NULL, NULL);
INSERT INTO public.professors VALUES ('ca226642-815a-458a-88dc-097e2c735d11', 'Prof.Dr.', 'Alper DUMAN', 'İşletme Fakültesi', 'Ekonomi', '8186', 'C', '7', '708', NULL, NULL);
INSERT INTO public.professors VALUES ('1ab87b34-4244-4575-8714-34885d206bb8', 'Prof.Dr.', 'Adem Yavuz ELVEREN', 'İşletme Fakültesi', 'Ekonomi', '8545', 'C', '7', '710', NULL, NULL);
INSERT INTO public.professors VALUES ('6f858f8f-b6b6-40d4-bcd9-2657f7636b68', 'Doç.Dr.', 'Gül ERTAN ÖZGÜZER', 'İşletme Fakültesi', 'Ekonomi', '8482', 'C', '9', '910', NULL, NULL);
INSERT INTO public.professors VALUES ('403b45d3-bf49-43dd-b9e4-1ec174a2c542', 'Dr.Öğr.Üyesi', 'Sıtkı Değer ERYAR', 'İşletme Fakültesi', 'Ekonomi', '9853', 'C', '7', '713', NULL, NULL);
INSERT INTO public.professors VALUES ('a89a0843-ff48-45ea-8f55-c68e8b8fea98', 'Araş.Gör.', 'Derya Barış ŞEN', 'İşletme Fakültesi', 'Ekonomi', '8519', 'C', '8', '815', NULL, NULL);
INSERT INTO public.professors VALUES ('bc9f22ab-a750-4cc9-b9d2-ba791364c5d9', 'Araş.Gör.', 'Samet ŞİMŞEK', 'İşletme Fakültesi', 'Ekonomi', '9871', 'C', '8', '815', NULL, NULL);
INSERT INTO public.professors VALUES ('0b414377-46f3-40c5-a418-6badeb311e06', 'Prof.Dr.', 'Semra TUNALI', 'İşletme Fakültesi', 'İşletme', '8383', 'C', '8', '812', NULL, NULL);
INSERT INTO public.professors VALUES ('99ab55fd-4ba1-4680-8067-00dfbab566bb', 'Prof.Dr.', 'Şükrü ÖZEN', 'İşletme Fakültesi', 'İşletme', '8242', 'C', '8', '813', NULL, NULL);
INSERT INTO public.professors VALUES ('41c3ed9b-312e-4730-89bd-76766f22384a', 'Prof.Dr.', 'Burcu GÜNERİ ÇANGARLI', 'İşletme Fakültesi', 'İşletme', '8126', 'C', '8', '837', NULL, NULL);
INSERT INTO public.professors VALUES ('d3c8185f-1176-4ab3-a078-116a2fa8554d', 'Prof.Dr.', 'Mehmet GENÇER', 'İşletme Fakültesi', 'İşletme', '8559', 'C', '8', '834', NULL, NULL);
INSERT INTO public.professors VALUES ('fc2214da-db9f-4379-8ca3-e1502066bcb3', 'Prof.Dr.', 'Remziye Gülem ATABAY', 'İşletme Fakültesi', 'İşletme', '8331', 'C', '9', '907', NULL, NULL);
INSERT INTO public.professors VALUES ('38ddf2a0-d1af-4b37-98e0-e4c1fe427765', 'Prof.Dr.', 'Tuğba TUĞRUL', 'İşletme Fakültesi', 'İşletme', '8143', 'C', '8', '810', NULL, NULL);
INSERT INTO public.professors VALUES ('6b711763-b988-4da0-b084-29e8f58308b2', 'Doç.Dr.', 'Metehan Feridun SORKUN', 'İşletme Fakültesi', 'İşletme', '8510', 'C', '8', '816', NULL, NULL);
INSERT INTO public.professors VALUES ('fd7b2404-09eb-425e-8a6c-3f3d00209850', 'Doç.Dr.', 'Zeynep ERTEKİN', 'İşletme Fakültesi', 'İşletme', '8529', 'C', '8', '819', NULL, NULL);
INSERT INTO public.professors VALUES ('9a32f7d1-1ded-423b-8f5f-683fc505e9b4', 'Dr.Öğr.Üyesi', 'Alev ÖZER TORGALÖZ', 'İşletme Fakültesi', 'İşletme', '5156', 'C', '8', '825', NULL, NULL);
INSERT INTO public.professors VALUES ('15792a50-f221-4f77-99c8-6c13a74a1bb2', 'Dr.Öğr.Üyesi', 'Nilgün GÜRKAYNAK', 'İşletme Fakültesi', 'İşletme', '8582', 'C', '8', '829', NULL, NULL);
INSERT INTO public.professors VALUES ('dfd228dd-e110-41a3-a19b-03f04d5d299b', 'Öğr.Gör.', 'Taylan Özgür DEMİRKAYA', 'İşletme Fakültesi', 'İşletme', '8306', 'C', '8', '822', NULL, NULL);
INSERT INTO public.professors VALUES ('41a7d18d-8122-4d3f-a0cc-641c1121e81c', 'Araş.Gör.', 'Beyza GÜREL', 'İşletme Fakültesi', 'İşletme', '9874', 'C', '8', '821', NULL, NULL);
INSERT INTO public.professors VALUES ('9281eb54-8b22-422f-93f1-d4ea03e4f788', 'Araş.Gör.', 'Gizem HALİL', 'İşletme Fakültesi', 'İşletme', '9860', 'C', '9', 'C9 AÇIK OFİS', NULL, NULL);
INSERT INTO public.professors VALUES ('981c7947-17df-4bb3-a33a-e56ba0c31282', 'Araş.Gör.', 'Damlasu UYUĞ ŞENGÜN', 'İşletme Fakültesi', 'İşletme', '8342', 'C', '8', '826', NULL, NULL);
INSERT INTO public.professors VALUES ('ebe258a4-5b15-47c6-98c2-51ee0baf26bc', 'Araş.Gör.', 'Zeynep GÖKSU BEŞKAYA', 'İşletme Fakültesi', 'İşletme', '8446', 'C', '8', '826', NULL, NULL);
INSERT INTO public.professors VALUES ('59e06e70-f1f4-401c-91d0-127e3483169c', 'Prof.Dr.', 'Öznur YURT YAŞAR', 'İşletme Fakültesi', 'Lojistik Yönetimi', '5155 8126', 'C', '8', '809', NULL, NULL);
INSERT INTO public.professors VALUES ('f8f5166b-9890-4213-9ff7-90b444cf3695', 'Prof.Dr.', 'Muhittin Hakan DEMİR', 'İşletme Fakültesi', 'Lojistik Yönetimi', '8477', 'C', '8', '807', NULL, NULL);
INSERT INTO public.professors VALUES ('ca33aa8e-d6f2-4d36-b05f-2ddf8bcf4b06', 'Prof.Dr.', 'Nail Özgür ÖZPEYNİRCİ', 'İşletme Fakültesi', 'Lojistik Yönetimi', '8424', 'C', '9', '909', NULL, NULL);
INSERT INTO public.professors VALUES ('d245e004-32a5-4881-8c9c-5479cbb255c3', 'Prof.Dr.', 'Bengü OFLAÇ', 'İşletme Fakültesi', 'Lojistik Yönetimi', '8190', 'C', '8', '808', NULL, NULL);
INSERT INTO public.professors VALUES ('74e64366-af23-490f-8509-6c7dc0f818fc', 'Prof.Dr.', 'Işık Özge YUMURTACI HÜSEYİNOĞLU', 'İşletme Fakültesi', 'Lojistik Yönetimi', '9864', 'C', '8', '828', NULL, NULL);
INSERT INTO public.professors VALUES ('5d006054-041f-4bd2-849d-1d402dcba8ad', 'Doç.Dr.', 'Aysu GÖÇER', 'İşletme Fakültesi', 'Lojistik Yönetimi', '8462', 'C', '8', '833', NULL, NULL);
INSERT INTO public.professors VALUES ('8a5d4257-bbb7-474d-8688-ad6a34f24c89', 'Dr.Öğr.Üyesi', 'Sinem TOKÇAER', 'İşletme Fakültesi', 'Lojistik Yönetimi', '5132', 'C', '8', '817', NULL, NULL);
INSERT INTO public.professors VALUES ('2008f76a-5ad1-4c6e-a34f-845f3e6ffc0d', 'Araş.Gör.', 'Burçin ÖZDAMAR', 'İşletme Fakültesi', 'Lojistik Yönetimi', '8128', 'C', '8', '821', NULL, NULL);
INSERT INTO public.professors VALUES ('68a561bc-d163-4628-a1ec-42c5e01b895a', 'Prof.Dr.', 'Filiz BAŞKAN', 'İşletme Fakültesi', 'Siyaset Bilimi ve Ulusl. İlişkiler', '8191', 'C', '8', '835', NULL, NULL);
INSERT INTO public.professors VALUES ('18f5d22f-452a-4d14-99bf-0f4f0f94f3f8', 'Prof.Dr.', 'Çiğdem ÇİN', 'İşletme Fakültesi', 'Siyaset Bilimi ve Ulusl. İlişkiler', '8382', 'C', '7', '707', NULL, NULL);
INSERT INTO public.professors VALUES ('a2e54306-beb7-4010-8643-aa75b2687e71', 'Prof.Dr.', 'Murat BOROVALI', 'İşletme Fakültesi', 'Siyaset Bilimi ve Ulusl. İlişkiler', '5155 8126', 'C', '8', '809', NULL, NULL);
INSERT INTO public.professors VALUES ('64edf8a8-a66a-4aaa-8a7c-6cb492c3f278', 'Doç.Dr.', 'Devrim SEZER', 'İşletme Fakültesi', 'Siyaset Bilimi ve Ulusl. İlişkiler', '8549', 'C', '9', '911', NULL, NULL);
INSERT INTO public.professors VALUES ('bdf67e64-80dc-4cc1-8215-7f889a85c749', 'Doç.Dr.', 'Sıtkı EGELİ', 'İşletme Fakültesi', 'Siyaset Bilimi ve Ulusl. İlişkiler', '5164', 'C', '8', '818', NULL, NULL);
INSERT INTO public.professors VALUES ('9563429e-2a43-468a-989d-23494f2ef3e0', 'Doç.Dr.', 'Serhun AL', 'İşletme Fakültesi', 'Siyaset Bilimi ve Ulusl. İlişkiler', '8298', 'C', '7', '711', NULL, NULL);
INSERT INTO public.professors VALUES ('98e3883b-07d6-4818-a80a-9d825e3031eb', 'Dr.Öğr.Üyesi', 'Benal Nazlı ÜSTÜNES DEMİRHAN', 'İşletme Fakültesi', 'Siyaset Bilimi ve Ulusl. İlişkiler', '5847', 'C', '8', '824', NULL, NULL);
INSERT INTO public.professors VALUES ('23e50082-b69e-4d1e-b479-2a0237a7b75d', 'Dr.Öğr.Üyesi', 'Umut Can ADISÖNMEZ', 'İşletme Fakültesi', 'Siyaset Bilimi ve Ulusl. İlişkiler', '5171', 'C', '8', '811', NULL, NULL);
INSERT INTO public.professors VALUES ('c3ae6d29-f7bf-4b59-9a3d-eeef2e264c3f', 'Dr.Öğr.Üyesi', 'Ogan YUMLU', 'İşletme Fakültesi', 'Siyaset Bilimi ve Ulusl. İlişkiler', '8413', 'C', '7', '719', NULL, NULL);
INSERT INTO public.professors VALUES ('b05f68a0-0aab-4c8f-aac1-2a86666dc36b', 'Araş.Gör.', 'Batıkan BULUT', 'İşletme Fakültesi', 'Siyaset Bilimi ve Ulusl. İlişkiler', '8265', 'C', '8', '822', NULL, NULL);
INSERT INTO public.professors VALUES ('921ec608-539d-4115-ac01-da9dba995ee4', 'Araş.Gör.', 'Nil DİKMENGİL', 'İşletme Fakültesi', 'Siyaset Bilimi ve Ulusl. İlişkiler', '9880', 'C', '9', 'C9 AÇIK OFİS', NULL, NULL);
INSERT INTO public.professors VALUES ('41c27f53-75c4-4d78-b8e5-5d3f60141bba', 'Prof.Dr.', 'Cumhur Coşkun KÜÇÜKÖZMEN', 'İşletme Fakültesi', 'Uluslararası Ticaret ve Finansman', '9868', 'C', '8', '814', NULL, NULL);
INSERT INTO public.professors VALUES ('b8863794-cddc-4998-8a81-edbb9da1bf99', 'Prof.Dr.', 'Gülin VARDAR', 'İşletme Fakültesi', 'Uluslararası Ticaret ve Finansman', '8554', 'C', '9', '908', NULL, NULL);
INSERT INTO public.professors VALUES ('3e4ec4af-efe5-4131-832a-114167b46ae6', 'Prof.Dr.', 'Berna AYDOĞAN', 'İşletme Fakültesi', 'Uluslararası Ticaret ve Finansman', '8244', 'C', '8', '832', NULL, NULL);
INSERT INTO public.professors VALUES ('2ffdb609-35c8-49f8-ad8b-1e812416e585', 'Dr.Öğr.Üyesi', 'Birce DOBRUCALI YELKENCİ', 'İşletme Fakültesi', 'Uluslararası Ticaret ve Finansman', '5149', 'C', '8', '830', NULL, NULL);
INSERT INTO public.professors VALUES ('43cd6e8d-04a3-421f-8beb-74051759954c', 'Araş.Gör.', 'Birce TEDİK KOCAKAYA', 'İşletme Fakültesi', 'Uluslararası Ticaret ve Finansman', '8140', 'C', '9', 'C9 AÇIK OFİS', NULL, NULL);
INSERT INTO public.professors VALUES ('6270c158-613d-4fc4-b5e9-c830e4bab020', 'Araş.Gör.', 'Elif TOKGÖZ', 'İşletme Fakültesi', 'Uluslararası Ticaret ve Finansman', '5134', 'C', '9', 'C9 AÇIK OFİS', NULL, NULL);
INSERT INTO public.professors VALUES ('aa04c620-596d-494f-8701-3113d6d733da', 'Araş.Gör.', 'Hasan GÜLOĞLU', 'İşletme Fakültesi', 'Ekonomİ', '8425', 'C', '8', '815', NULL, NULL);
INSERT INTO public.professors VALUES ('2fc5f772-1b70-45ce-af40-32133eec0272', 'Araş.Gör.', 'Betül ÜNAL KAYA', 'İşletme Fakültesi', 'İşletme', '5478', 'C', '9', 'C9 AÇIK OFİS', NULL, NULL);
INSERT INTO public.professors VALUES ('bf27d6a4-35c8-482c-aaa4-156bbd37bc06', 'Araş.Gör.', 'Yiğitcan AKGÜN', 'İşletme Fakültesi', 'Lojistik Yönetimi', '5823', 'C', '9', 'C9 AÇIK OFİS', NULL, NULL);
INSERT INTO public.professors VALUES ('6144f4c0-a5af-4d8c-8e9e-f7a00549b3e9', 'Dr.Öğr.Üyesi', 'Mustafa Reha OKUR', 'İşletme Fakültesi', 'Muhasebe ve Denetim', '8555', 'C', '8', '823', NULL, NULL);
INSERT INTO public.professors VALUES ('523ea79a-53ca-4ece-9c05-06daa2feb085', 'Dr.Öğr.Üyesi', 'Elçin YILMAZ', 'Rektörlük', 'Ortak dersler', '8469', 'C', '9', '905', NULL, NULL);
INSERT INTO public.professors VALUES ('6f247fa7-c36e-4b9d-ad19-0c2fd6ae1d23', 'Dr.Öğr.Üyesi', 'Ünsal Doğan BAŞKIR', 'Rektörlük', 'Ortak dersler', '8460', 'C', '9', '905', NULL, NULL);
INSERT INTO public.professors VALUES ('669effbb-3ac3-4eb2-be3c-28a7481d5c7c', 'Öğr.Gör.', 'Zarife Ekim SEVİNDİ', 'Rektörlük', 'Ortak dersler', '8180', 'A', '1', '129', NULL, NULL);
INSERT INTO public.professors VALUES ('2f9b194e-2a10-41f6-a71b-bac40906928d', 'Öğr.Gör.', 'Devrim Burcu EĞİLMEZ', 'Rektörlük', 'Ortak dersler', '5107', 'A', '1', '129', NULL, NULL);
INSERT INTO public.professors VALUES ('e4e7118d-1078-4bbc-bde8-5a5b302fc067', 'Dr.Öğr.Üyesi', 'Filiz MERGEN', 'Meslek Yüksekokulu', 'Uygulamalı İngilizce Çevirmenlik', '8535', 'A', '1', '106', NULL, NULL);
INSERT INTO public.professors VALUES ('93053b55-55d5-407e-875b-abce9b0e6ad8', 'Dr.Öğr.Üyesi', 'Burçin ÖNDER', 'Meslek Yüksekokulu', 'Pazarlama', '9849', 'A', '1', '120', NULL, NULL);
INSERT INTO public.professors VALUES ('a619fffd-32b8-47e7-998e-f591caf58799', 'Öğr.Gör.Dr.', 'Serkan BOLAT', 'Meslek Yüksekokulu', 'Laboratuvar Teknolojisi', '9826', 'A', '1', '105', NULL, NULL);
INSERT INTO public.professors VALUES ('f289b3dd-a491-4e3d-bdd0-832f999d8b59', 'Öğr.Gör.Dr.', 'İdil BOLAT', 'Meslek Yüksekokulu', 'Radyo ve TV', '9828', 'A', '1', '121', NULL, NULL);
INSERT INTO public.professors VALUES ('bb94bab2-a5dc-4222-8f5b-1455738f0d1a', 'Öğr.Gör.Dr.', 'İlker YALÇIN', 'Meslek Yüksekokulu', 'Mobilya Ve Dekorasyon', '8537', 'A', '1', '110', NULL, NULL);
INSERT INTO public.professors VALUES ('0dc6aa44-8583-4ac4-bb91-38bb0ede9cfb', 'Öğr.Gör.Dr.', 'Oylum DİKMEN GÜLERYÜZ', 'Meslek Yüksekokulu', 'Mimari Restorasyon', '8525', 'A', '1', '121', NULL, NULL);
INSERT INTO public.professors VALUES ('df9606d0-ab5f-47c6-bc67-3178c315e759', 'Öğr.Gör.Dr.', 'Mehmet Efe Selman', 'Meslek Yüksekokulu', 'İnşaat Teknolojisi', '9850', 'A', '1', '111', NULL, NULL);
INSERT INTO public.professors VALUES ('0564718c-f748-4ba0-bc5c-67e38b28bd66', 'Öğr.Gör.Dr.', 'Semra KELEŞ', 'Meslek Yüksekokulu', 'Radyo ve TV', '8536', 'A', '1', '121', NULL, NULL);
INSERT INTO public.professors VALUES ('4b84669b-287e-4e01-9ec0-0637fca892fb', 'Öğr.Gör.Dr.', 'Kenan DEMİREL', 'Meslek Yüksekokulu', 'Pazarlama', '9841', 'A', '1', '107', NULL, NULL);
INSERT INTO public.professors VALUES ('ee327359-d9ca-4ca1-8eb0-986204240aee', 'Öğr.Gör.', 'Tolga GENÇ', 'Meslek Yüksekokulu', 'Bankacılık ve Sigortacılık', '8361', 'A', '1', '107', NULL, NULL);
INSERT INTO public.professors VALUES ('7fdff619-1cb5-4d50-9663-b5ff66d629ca', 'Öğr.Gör.', 'Gönül AYRANCI', 'Meslek Yüksekokulu', 'Bankacılık ve Sigortacılık', '8362', 'A', '1', '107', NULL, NULL);
INSERT INTO public.professors VALUES ('eec57788-983b-4b4a-bf56-3ed42378280a', 'Öğr.Gör.', 'Çiğdem BİLAL', 'Meslek Yüksekokulu', 'Sivil Havacılık ve Kabin Hizmetleri', '8520', 'A', '1', '106', NULL, NULL);
INSERT INTO public.professors VALUES ('1f64b489-c8d8-49eb-8fbd-b99ae7c775cd', 'Öğr.Gör.', 'Damla KALEŞ', 'Meslek Yüksekokulu', 'Uygulamalı İngilizce Çevirmenlik', '5140', 'A', '1', '106', NULL, NULL);
INSERT INTO public.professors VALUES ('e7d19432-dce5-4cb3-b9a7-782d4873639e', 'Öğr.Gör.', 'Edit HABİF', 'Meslek Yüksekokulu', 'Turizm Otel İşletmeciliği', '9885', 'A', '1', '110', NULL, NULL);
INSERT INTO public.professors VALUES ('10644cab-fe34-4477-9da9-cd953e7f56c8', 'Öğr.Gör.', 'Emre KÜHEYLAN', 'Meslek Yüksekokulu', 'Radyo ve TV', '8114', 'A', '1', '118', NULL, NULL);
INSERT INTO public.professors VALUES ('a3460eb5-376d-41af-a231-ded885a57f54', 'Öğr.Gör.', 'Şeyma GÖKTÜRK ÇELİK', 'Meslek Yüksekokulu', 'Mimari Restorasyon', '9847', 'A', '1', '111', NULL, NULL);
INSERT INTO public.professors VALUES ('ab285b47-26dd-49e9-ba48-a123d7d2a000', 'Öğr.Gör.', 'Yarkın ÜSTÜNES', 'Meslek Yüksekokulu', 'Mimari Restorasyon', '8216', 'A', '1', '111', NULL, NULL);
INSERT INTO public.professors VALUES ('0f588910-db8d-4b1b-97a0-83f740caa1ce', 'Öğr.Gör.', 'Fatma Esra UZ', 'Meslek Yüksekokulu', 'İnşaat Teknolojisi', '9847', 'A', '1', '111', NULL, NULL);
INSERT INTO public.professors VALUES ('2776f195-267c-4d97-903f-574b627c2b49', 'Öğr.Gör.', 'Hüseyin TOKAT', 'Meslek Yüksekokulu', 'Bilgisayar Programcılığı', '5130', 'A', '1', '105', NULL, NULL);
INSERT INTO public.professors VALUES ('1820643a-0de9-4421-9e4e-43c3a651ca02', 'Öğr.Gör.', 'Burak EVRENTUĞ', 'Meslek Yüksekokulu', 'Bilgisayar Programcılığı', '8574', 'A', '1', '105', NULL, NULL);
INSERT INTO public.professors VALUES ('eea33068-c1e5-45da-8041-8b9803ead068', 'Öğr.Gör.', 'Turgay ZÜLAM', 'Meslek Yüksekokulu', 'Bilgisayar Programcılığı', '8539', 'A', '1', '105', NULL, NULL);
INSERT INTO public.professors VALUES ('8bb6dc6c-e54d-4370-b9d3-23efe36a8446', 'Öğr.Gör.', 'Gülce YÜKSEL', 'Meslek Yüksekokulu', 'Grafik Tasarım', '5144', 'A', '1', '122', NULL, NULL);
INSERT INTO public.professors VALUES ('f1a0471c-01d9-41fd-add6-54c7a1551d80', 'Öğr.Gör.', 'Deniz BABİLİK', 'Meslek Yüksekokulu', 'Grafik Tasarım', '5182', 'A', '1', '122', NULL, NULL);
INSERT INTO public.professors VALUES ('01399d7b-41b1-4ef3-a76b-2788fcb1cfad', 'Öğr.Gör.', 'İlayda ÜREL AKBOĞA', 'Meslek Yüksekokulu', 'Grafik Tasarım', '8436', 'A', '1', '122', NULL, NULL);
INSERT INTO public.professors VALUES ('1e888f0c-492b-4ca4-9bb8-13887bcca820', 'Prof.Dr.', 'Emrullah Turhan TUNALI', 'Mühendislik Fak.', 'Bilgisayar Mühendisliği', '8553', 'A', '4', '412', NULL, NULL);
INSERT INTO public.professors VALUES ('ebeacd0b-b6d5-42f2-9ea4-7cb990ef6619', 'Prof.Dr.', 'Yusuf Murat ERTEN', 'Mühendislik Fak.', 'Bilgisayar Mühendisliği', '5148', 'A', '1', '128', NULL, NULL);
INSERT INTO public.professors VALUES ('e4b95388-94ce-4bea-a719-5894a7957969', 'Doç.Dr.', 'Kaya OĞUZ', 'Mühendislik Fak.', 'Bilgisayar Mühendisliği', '8289', 'A', '2', '209', NULL, NULL);
INSERT INTO public.professors VALUES ('473e8cc2-5fc1-4f80-be40-c65b43e7ce06', 'Dr.Öğr.Üyesi', 'Görkem KILINÇ SOYLU', 'Mühendislik Fak.', 'Bilgisayar Mühendisliği', '5848', 'A', '2', '214', NULL, NULL);
INSERT INTO public.professors VALUES ('ade4b65a-a56c-46cb-bf87-4f9def2e0e42', 'Dr.Öğr.Üyesi', 'Kutluhan EROL', 'Mühendislik Fak.', 'Bilgisayar Mühendisliği', '8375', 'A', '2', '208', NULL, NULL);
INSERT INTO public.professors VALUES ('667694ae-e0f1-412e-a696-4ed8812f6637', 'Dr.Öğr.Üyesi', 'Alper DEMİR', 'Mühendislik Fak.', 'Bilgisayar Mühendisliği', '8286', 'A', '4', '406', NULL, NULL);
INSERT INTO public.professors VALUES ('f08c7bb9-bbe8-48bb-ad42-21c566c7ea0b', 'Dr.Öğr.Üyesi', 'İlker KORKMAZ', 'Mühendislik Fak.', 'Bilgisayar Mühendisliği', '8258', 'A', '4', '418', NULL, NULL);
INSERT INTO public.professors VALUES ('4a033212-dcfb-4ebb-9494-b8fa024506c5', 'Araş.Gör.', 'Muhtar Çağkan ULUDAĞLI', 'Mühendislik Fak.', 'Bilgisayar Mühendisliği', '5184', 'A', '3', '305', NULL, NULL);
INSERT INTO public.professors VALUES ('0e461bc4-b027-463e-9a7a-77b62f726b46', 'Prof.Dr.', 'Cem EVRENDİLEK', 'Mühendislik Fak.', 'Bilgisayar Mühendisliği', '8220', 'A', '3', '311', NULL, NULL);
INSERT INTO public.professors VALUES ('52e2b6b1-bfe7-4e61-86bc-9078539b677e', 'Araş.Gör.', 'Çınar GEDİZLİOĞLU', 'Mühendislik Fak.', 'Bilgisayar Mühendisliği', '5185', 'MB', 'ZEMİN', '166', NULL, NULL);
INSERT INTO public.professors VALUES ('6e4b38d2-0f9b-4afa-a683-ad35e44a623d', 'Araş.Gör.', 'Melek Büşra TEMUÇİN', 'Mühendislik Fak.', 'Bilgisayar Mühendisliği', '8185', 'MB', 'ZEMİN', '166', NULL, NULL);
INSERT INTO public.professors VALUES ('f2877549-ed67-41e9-9693-61f889086b6e', 'Araş.Gör.', 'Beyza ALTUNER', 'Mühendislik Fak.', 'Bilgisayar Mühendisliği', '5819', 'MB', 'ZEMİN', '166', NULL, NULL);
INSERT INTO public.professors VALUES ('cb968cac-493a-44f1-b2ea-07bce9cfeefb', 'Dr.Öğr.Üyesi', 'Okan YAMAN', 'Mühendislik Fak.', 'Bilgisayar Mühendisliği', '8135', 'A', '3', '328', NULL, NULL);
INSERT INTO public.professors VALUES ('ee8e9b20-d21c-4333-a574-f6a00a999ea8', 'Prof.Dr.', 'Murat AŞKAR', 'Mühendislik Fak.', 'Elektrik Elektronik Mühendisliği', '8305', 'A', '3', '314', NULL, NULL);
INSERT INTO public.professors VALUES ('d9dcd3a6-f05d-464f-8ecc-b307a3e5ecd2', 'Prof.Dr.', 'Levent EREN', 'Mühendislik Fak.', 'Elektrik Elektronik Mühendisliği', '8291', 'A', '3', '318', NULL, NULL);
INSERT INTO public.professors VALUES ('fe7fb864-38ab-4be7-91a4-ebc052dccda7', 'Prof.Dr.', 'Aydın AKAN', 'Mühendislik Fak.', 'Elektrik Elektronik Mühendisliği', '9827', 'A', '4', '408', NULL, NULL);
INSERT INTO public.professors VALUES ('ea0ebaea-1585-44f4-a927-189a6a808f72', 'Doç.Dr.', 'Pınar OĞUZ EKİM', 'Mühendislik Fak.', 'Elektrik Elektronik Mühendisliği', '8137', 'A', '3', '305', NULL, NULL);
INSERT INTO public.professors VALUES ('05f25fed-9abc-4ea8-933b-1e8a666b4ee9', 'Dr.Öğr.Üyesi', 'Bülent BİLİR', 'Mühendislik Fak.', 'Elektrik Elektronik Mühendisliği', '9823', 'A', '2', '208', NULL, NULL);
INSERT INTO public.professors VALUES ('3d261cd1-90d4-493d-99a5-4109e089a144', 'Doç.Dr.', 'Mehmet TÜRKAN', 'Mühendislik Fak.', 'Elektrik Elektronik Mühendisliği', '8581', 'A', '3', '308', NULL, NULL);
INSERT INTO public.professors VALUES ('f6bea312-f5ee-418b-bc35-4b49b2dddb33', 'Dr.Öğr.Üyesi', 'Faezeh YEGANLI', 'Mühendislik Fak.', 'Elektrik Elektronik Mühendisliği', '8541', 'A', '5', '507', NULL, NULL);
INSERT INTO public.professors VALUES ('293f55a1-1563-4ab1-a74b-d47261476c27', 'Dr.Öğr.Üyesi', 'Ayça KUMLUCA', 'Mühendislik Fak.', 'Elektrik Elektronik Mühendisliği', '5146', 'A', '2', '207', NULL, NULL);
INSERT INTO public.professors VALUES ('6c9984f0-bc8a-4e0f-b76b-b14ff08053f7', 'Araş.Gör.', 'Sena Yağmur ŞEN', 'Mühendislik Fak.', 'Elektrik Elektronik Mühendisliği', '5194', 'MB', 'ZEMİN', '168', NULL, NULL);
INSERT INTO public.professors VALUES ('839c88f0-e312-43fa-8be1-75695c4b47b3', 'Araş.Gör.', 'Berkay İlber TUNAKAN', 'Mühendislik Fak.', 'Elektrik Elektronik Mühendisliği', '5454', 'MB', 'ZEMİN', '166', NULL, NULL);
INSERT INTO public.professors VALUES ('c3f21288-af86-42f9-a46e-81c1a0967f70', 'Araş.Gör.', 'Burak AKBUĞDAY', 'Mühendislik Fak.', 'Elektrik Elektronik Mühendisliği', '5157', 'ML', '2', '203', NULL, NULL);
INSERT INTO public.professors VALUES ('9c2fab91-8e70-457a-bb11-2cf7c4b7e02a', 'Prof.Dr.', 'Ahmet Sermet ANAGÜN', 'Mühendislik Fak.', 'Endüstri Mühendisliği', '8370', 'A', '2', '215', NULL, NULL);
INSERT INTO public.professors VALUES ('8b3d9dff-a3bb-4045-b681-a6b0416dfbfd', 'Prof.Dr.', 'Selin ÖZPEYNİRCİ', 'Mühendislik Fak.', 'Endüstri Mühendisliği', '8259', 'A', '3', '309', NULL, NULL);
INSERT INTO public.professors VALUES ('639c5d00-84d6-4b6e-9898-75f6edf82092', 'Doç.Dr.', 'Hamdi Giray REŞAT', 'Mühendislik Fak.', 'Endüstri Mühendisliği', '8465', 'A', '3', '313', NULL, NULL);
INSERT INTO public.professors VALUES ('d526e51c-9d0e-4829-891c-d26da06983c5', 'Dr.Öğr.Üyesi', 'Kamil Erkan KABAK', 'Mühendislik Fak.', 'Endüstri Mühendisliği', '8357', 'A', '3', '313', NULL, NULL);
INSERT INTO public.professors VALUES ('e146df12-ada0-426b-82bb-e7a6b6010812', 'Dr.Öğr.Üyesi', 'Görkem YILMAZ', 'Mühendislik Fak.', 'Endüstri Mühendisliği', '5335', 'A', '5', '511', NULL, NULL);
INSERT INTO public.professors VALUES ('f775aae1-b979-4781-b698-e58abff8bdf6', 'Dr.Öğr.Üyesi', 'Arya MİSİÇ', 'Mühendislik Fak.', 'Endüstri Mühendisliği', '8261', 'A', '3', '309', NULL, NULL);
INSERT INTO public.professors VALUES ('27b99ab8-8984-4a53-b9d1-3c01f8d463c6', 'Dr.Öğr.Üyesi', 'Oktay KARABAĞ', 'Mühendislik Fak.', 'Endüstri Mühendisliği', '8303', 'A', '3', '311', NULL, NULL);
INSERT INTO public.professors VALUES ('247bfeed-3986-4c21-b578-6764b49d852c', 'Araş.Gör.', 'Ozan Baran DEMİRÇİVİ', 'Mühendislik Fak.', 'Endüstri Mühendisliği', '5150', 'MB', 'ZEMİN', '159', NULL, NULL);
INSERT INTO public.professors VALUES ('d57a1df0-f786-4736-87a6-99408e9237c5', 'Araş.Gör.', 'Onat DÜZGÜN', 'Mühendislik Fak.', 'Endüstri Mühendisliği', '5816', 'MB', 'ZEMİN', '159', NULL, NULL);
INSERT INTO public.professors VALUES ('39fb0786-6638-477a-8c1a-8290c1571e87', 'Araş.Gör.', 'Gamze ERDEM', 'Mühendislik Fak.', 'Endüstri Mühendisliği', '8330', 'MB', 'ZEMİN', '159', NULL, NULL);
INSERT INTO public.professors VALUES ('3a797b4b-5966-4998-b134-80f9982c91c2', 'Prof.Dr.', 'Kamile Nazan TURHAN', 'Uygulamalı Yönetim Bilimleri Y.O.', 'Gastronomi ve Mutfak Sanatları', '8456', 'A', '4', '407', NULL, NULL);
INSERT INTO public.professors VALUES ('aa458de0-4ca7-4803-a235-98197b88ed3c', 'Araş.Gör.', 'Özge KOCAHAN SÜER', 'Mühendislik Fak.', 'Gıda Mühendisliği', '5186', 'C', '3', '305', NULL, NULL);
INSERT INTO public.professors VALUES ('16090575-8f66-4a6e-a2b3-656fd6a8eb1e', 'Prof.Dr.', 'Emrullah Turhan TUNALI', 'Mühendislik Fak.', 'Bilgisayar Mühendisliği', '8553', 'A', '4', '412', NULL, NULL);
INSERT INTO public.professors VALUES ('359d90e3-cf80-4e15-b791-fb2ce63297f7', 'Prof.Dr.', 'Yusuf Murat ERTEN', 'Mühendislik Fak.', 'Bilgisayar Mühendisliği', '5148', 'A', '1', '128', NULL, NULL);
INSERT INTO public.professors VALUES ('b611dbf2-42ac-4c28-804a-bde6ec318af3', 'Doç.Dr.', 'Kaya OĞUZ', 'Mühendislik Fak.', 'Bilgisayar Mühendisliği', '8289', 'A', '2', '209', NULL, NULL);
INSERT INTO public.professors VALUES ('c4bd9205-f71a-4d43-bd03-ae04dbe03770', 'Dr.Öğr.Üyesi', 'Görkem KILINÇ SOYLU', 'Mühendislik Fak.', 'Bilgisayar Mühendisliği', '5848', 'A', '2', '214', NULL, NULL);
INSERT INTO public.professors VALUES ('f5ba9638-bce6-4c84-abf5-815b9e0e83cd', 'Dr.Öğr.Üyesi', 'Kutluhan EROL', 'Mühendislik Fak.', 'Bilgisayar Mühendisliği', '8375', 'A', '2', '208', NULL, NULL);
INSERT INTO public.professors VALUES ('171e2381-703c-4692-961a-978fbd809917', 'Dr.Öğr.Üyesi', 'Alper DEMİR', 'Mühendislik Fak.', 'Bilgisayar Mühendisliği', '8286', 'A', '4', '406', NULL, NULL);
INSERT INTO public.professors VALUES ('fc2bce37-537e-458f-a96f-2dcddc6e54ce', 'Dr.Öğr.Üyesi', 'İlker KORKMAZ', 'Mühendislik Fak.', 'Bilgisayar Mühendisliği', '8258', 'A', '4', '418', NULL, NULL);
INSERT INTO public.professors VALUES ('efb0664c-287a-4b5a-8147-83f18b7ac9fc', 'Araş.Gör.', 'Muhtar Çağkan ULUDAĞLI', 'Mühendislik Fak.', 'Bilgisayar Mühendisliği', '5184', 'A', '3', '305', NULL, NULL);
INSERT INTO public.professors VALUES ('8ed2ffea-a2eb-4236-976f-edcf07d463c7', 'Prof.Dr.', 'Cem EVRENDİLEK', 'Mühendislik Fak.', 'Bilgisayar Mühendisliği', '8220', 'A', '3', '311', NULL, NULL);
INSERT INTO public.professors VALUES ('73b0afa0-5a77-46e8-a939-c7048ac35003', 'Araş.Gör.', 'Çınar GEDİZLİOĞLU', 'Mühendislik Fak.', 'Bilgisayar Mühendisliği', '5185', 'MB', 'ZEMİN', '166', NULL, NULL);
INSERT INTO public.professors VALUES ('dfc6f18a-88ae-4ef5-ba06-55705ce5933b', 'Araş.Gör.', 'Melek Büşra TEMUÇİN', 'Mühendislik Fak.', 'Bilgisayar Mühendisliği', '8185', 'MB', 'ZEMİN', '166', NULL, NULL);
INSERT INTO public.professors VALUES ('1cc2c039-33ff-479a-a31b-d8798046a6a9', 'Araş.Gör.', 'Beyza ALTUNER', 'Mühendislik Fak.', 'Bilgisayar Mühendisliği', '5819', 'MB', 'ZEMİN', '166', NULL, NULL);
INSERT INTO public.professors VALUES ('83b34bcc-7dca-49f7-ab85-fc45b421131a', 'Dr.Öğr.Üyesi', 'Okan YAMAN', 'Mühendislik Fak.', 'Bilgisayar Mühendisliği', '8135', 'A', '3', '328', NULL, NULL);
INSERT INTO public.professors VALUES ('5ec4681d-3756-47b8-a8ed-c92b4c6f4e5b', 'Prof.Dr.', 'Murat AŞKAR', 'Mühendislik Fak.', 'Elektrik Elektronik Mühendisliği', '8305', 'A', '3', '314', NULL, NULL);
INSERT INTO public.professors VALUES ('5cb61581-f56c-4fdd-a876-5825eb19f678', 'Prof.Dr.', 'Levent EREN', 'Mühendislik Fak.', 'Elektrik Elektronik Mühendisliği', '8291', 'A', '3', '318', NULL, NULL);
INSERT INTO public.professors VALUES ('e097f0d9-faf4-4786-aaf4-b6cf3266d816', 'Prof.Dr.', 'Aydın AKAN', 'Mühendislik Fak.', 'Elektrik Elektronik Mühendisliği', '9827', 'A', '4', '408', NULL, NULL);
INSERT INTO public.professors VALUES ('ad4e41ae-5ed7-494d-9533-bd31f810044d', 'Doç.Dr.', 'Pınar OĞUZ EKİM', 'Mühendislik Fak.', 'Elektrik Elektronik Mühendisliği', '8137', 'A', '3', '305', NULL, NULL);
INSERT INTO public.professors VALUES ('401d79f5-1796-4e7b-b58d-a4455443e4e6', 'Dr.Öğr.Üyesi', 'Bülent BİLİR', 'Mühendislik Fak.', 'Elektrik Elektronik Mühendisliği', '9823', 'A', '2', '208', NULL, NULL);
INSERT INTO public.professors VALUES ('d18a2384-75dc-40a7-a9cb-9bbcff469c78', 'Doç.Dr.', 'Mehmet TÜRKAN', 'Mühendislik Fak.', 'Elektrik Elektronik Mühendisliği', '8581', 'A', '3', '308', NULL, NULL);
INSERT INTO public.professors VALUES ('dc0bc577-bd28-438b-933a-8f0c578ab82c', 'Dr.Öğr.Üyesi', 'Faezeh YEGANLI', 'Mühendislik Fak.', 'Elektrik Elektronik Mühendisliği', '8541', 'A', '5', '507', NULL, NULL);
INSERT INTO public.professors VALUES ('124f78d6-1a0b-4dd4-b224-c9a61ebcf920', 'Dr.Öğr.Üyesi', 'Ayça KUMLUCA', 'Mühendislik Fak.', 'Elektrik Elektronik Mühendisliği', '5146', 'A', '2', '207', NULL, NULL);
INSERT INTO public.professors VALUES ('35f621fb-8052-4de4-8ef4-497847fde27b', 'Araş.Gör.', 'Sena Yağmur ŞEN', 'Mühendislik Fak.', 'Elektrik Elektronik Mühendisliği', '5194', 'MB', 'ZEMİN', '168', NULL, NULL);
INSERT INTO public.professors VALUES ('46aad738-11cc-48fe-88dc-0052374327d7', 'Araş.Gör.', 'Berkay İlber TUNAKAN', 'Mühendislik Fak.', 'Elektrik Elektronik Mühendisliği', '5454', 'MB', 'ZEMİN', '166', NULL, NULL);
INSERT INTO public.professors VALUES ('6c669f36-6e46-4a1a-a98e-f3cb1e428f2f', 'Araş.Gör.', 'Burak AKBUĞDAY', 'Mühendislik Fak.', 'Elektrik Elektronik Mühendisliği', '5157', 'ML', '2', '203', NULL, NULL);
INSERT INTO public.professors VALUES ('302b34dc-70a6-4ec6-9b9f-4b3e5eb407ba', 'Prof.Dr.', 'Ahmet Sermet ANAGÜN', 'Mühendislik Fak.', 'Endüstri Mühendisliği', '8370', 'A', '2', '215', NULL, NULL);
INSERT INTO public.professors VALUES ('2d11dfe6-1894-492e-9073-dfe2be94c656', 'Prof.Dr.', 'Selin ÖZPEYNİRCİ', 'Mühendislik Fak.', 'Endüstri Mühendisliği', '8259', 'A', '3', '309', NULL, NULL);
INSERT INTO public.professors VALUES ('2df4c0e6-fbd9-4d7e-b3d7-8e6fd90772f4', 'Doç.Dr.', 'Hamdi Giray REŞAT', 'Mühendislik Fak.', 'Endüstri Mühendisliği', '8465', 'A', '3', '313', NULL, NULL);
INSERT INTO public.professors VALUES ('fcb6f0fc-d864-459f-8bbf-e29d585b29fb', 'Dr.Öğr.Üyesi', 'Kamil Erkan KABAK', 'Mühendislik Fak.', 'Endüstri Mühendisliği', '8357', 'A', '3', '313', NULL, NULL);
INSERT INTO public.professors VALUES ('e4b97bef-92d4-48a2-a066-f12f38f002a7', 'Dr.Öğr.Üyesi', 'Görkem YILMAZ', 'Mühendislik Fak.', 'Endüstri Mühendisliği', '5335', 'A', '5', '511', NULL, NULL);
INSERT INTO public.professors VALUES ('c8914608-7472-441c-bddd-96465ee98214', 'Dr.Öğr.Üyesi', 'Arya MİSİÇ', 'Mühendislik Fak.', 'Endüstri Mühendisliği', '8261', 'A', '3', '309', NULL, NULL);
INSERT INTO public.professors VALUES ('03220619-4969-4f93-9545-990b91a73864', 'Dr.Öğr.Üyesi', 'Oktay KARABAĞ', 'Mühendislik Fak.', 'Endüstri Mühendisliği', '8303', 'A', '3', '311', NULL, NULL);
INSERT INTO public.professors VALUES ('1899facc-ef3c-4074-af28-f1d301d3d03b', 'Araş.Gör.', 'Ozan Baran DEMİRÇİVİ', 'Mühendislik Fak.', 'Endüstri Mühendisliği', '5150', 'MB', 'ZEMİN', '159', NULL, NULL);
INSERT INTO public.professors VALUES ('ed6a8725-ff40-4364-a506-98f013128df1', 'Araş.Gör.', 'Onat DÜZGÜN', 'Mühendislik Fak.', 'Endüstri Mühendisliği', '5816', 'MB', 'ZEMİN', '159', NULL, NULL);
INSERT INTO public.professors VALUES ('f1b70ff5-c098-4d1f-aae5-470bc7916c5c', 'Araş.Gör.', 'Gamze ERDEM', 'Mühendislik Fak.', 'Endüstri Mühendisliği', '8330', 'MB', 'ZEMİN', '159', NULL, NULL);
INSERT INTO public.professors VALUES ('46f48f63-9d67-4506-8020-a307e7a0bad1', 'Prof.Dr.', 'Kamile Nazan TURHAN', 'Uygulamalı Yönetim Bilimleri Y.O.', 'Gastronomi ve Mutfak Sanatları', '8456', 'A', '4', '407', NULL, NULL);
INSERT INTO public.professors VALUES ('70cff1e2-b78a-4b59-85a8-4ef619eaf2ae', 'Araş.Gör.', 'Özge KOCAHAN SÜER', 'Mühendislik Fak.', 'Gıda Mühendisliği', '5186', 'C', '3', '305', NULL, NULL);
INSERT INTO public.professors VALUES ('2db26f4c-bce7-4bad-83d5-06cee9cd3097', 'Prof.Dr.', 'Mehmet Şükrü GÜNEY', 'Mühendislik Fak.', 'İnşaat Mühendisliği', '8472', 'A', '4', '409', NULL, NULL);
INSERT INTO public.professors VALUES ('1e82b5a7-eae0-4978-b6fe-7a95d73089b3', 'Prof.Dr.', 'Celalettin KOZANOĞLU', 'Mühendislik Fak.', 'İnşaat Mühendisliği', '8409', 'A', '2', '213', NULL, NULL);
INSERT INTO public.professors VALUES ('b96831c8-2637-41a5-bc3e-54a686f0aaa7', 'Prof.Dr.', 'Gökhan KILIÇ', 'Mühendislik Fak.', 'İnşaat Mühendisliği', '8257', 'A', '3', '325', NULL, NULL);
INSERT INTO public.professors VALUES ('6a90be2f-b83d-4b39-a44f-4d3da58b94eb', 'Doç.Dr.', 'Onur MERTER', 'Mühendislik Fak.', 'İnşaat Mühendisliği', '8526', 'A', '3', '306', NULL, NULL);
INSERT INTO public.professors VALUES ('12e7161b-8141-4b90-ac1e-b7ba6843d9c7', 'Dr.Öğr.Üyesi', 'Egemen SÖNMEZ', 'Mühendislik Fak.', 'İnşaat Mühendisliği', '8445', 'A', '2', '214', NULL, NULL);
INSERT INTO public.professors VALUES ('38cee84c-a352-4907-a769-420596d92982', 'Dr.Öğr.Üyesi', 'Pelin AKLIK', 'Mühendislik Fak.', 'İnşaat Mühendisliği', '8456', 'A', '2', '210', NULL, NULL);
INSERT INTO public.professors VALUES ('5fe69212-53c6-484f-b04a-76159629559b', 'Öğr.Gör.', 'Ruti Ruth POLİTİ', 'Mühendislik Fak.', 'İnşaat Mühendisliği', '5163', 'A', '3', '306', NULL, NULL);
INSERT INTO public.professors VALUES ('6cf77ece-3440-4d8d-9251-26ebb34b5fca', 'Araş.Gör.', 'Merve OKAN', 'Mühendislik Fak.', 'İnşaat Mühendisliği', '5158', 'MB', 'ZEMİN', '162', NULL, NULL);
INSERT INTO public.professors VALUES ('ef0add6f-eae2-444f-a04f-8100e398c17e', 'Araş.Gör.', 'Hüseyin Kürşat ÇELİK', 'Mühendislik Fak.', 'İnşaat Mühendisliği', '5181', 'MB', '0', '168', NULL, NULL);
INSERT INTO public.professors VALUES ('2a56978d-37c2-4252-9f6f-4949f45ad9c5', 'Prof.Dr.', 'Hakkı ESKİCİOĞLU', 'Mühendislik Fak.', 'Makine Mühendisliği', '9822', 'A', '4', '409', NULL, NULL);
INSERT INTO public.professors VALUES ('a0d4c67d-d53e-4383-9877-b02692f49715', 'Prof.Dr.', 'Lale Canan DÜLGER', 'Mühendislik Fak.', 'Makine Mühendisliği', '8557', 'A', '4', '405', NULL, NULL);
INSERT INTO public.professors VALUES ('d4779b13-a831-4ab7-a217-8f6d880ce126', 'Prof.Dr.', 'Fehmi Görkem ÜÇTUĞ', 'Mühendislik Fak.', 'Makine Mühendisliği', '8354', 'A', '4', '418', NULL, NULL);
INSERT INTO public.professors VALUES ('9b7e911c-9d8b-4c67-a604-5dcb749347cd', 'Doç.Dr.', 'Özge SAĞLAM', 'Mühendislik Fak.', 'Makine Mühendisliği', '8254', 'A', '4', '413', NULL, NULL);
INSERT INTO public.professors VALUES ('a2da5f74-2f91-4f52-ba15-5f24045b23d9', 'Dr.Öğr.Üyesi', 'Hüseyin Gökmen AKSOY', 'Mühendislik Fak.', 'Makine Mühendisliği', '5154', 'A', '5', '511', NULL, NULL);
INSERT INTO public.professors VALUES ('b50ccc83-17b5-4fe5-9240-22cc70a26a87', 'Dr.Öğr.Üyesi', 'Umut TABAK', 'Mühendislik Fak.', 'Makine Mühendisliği', '5154', 'A', '5', '511', NULL, NULL);
INSERT INTO public.professors VALUES ('18bf58ff-5c69-4955-b3b4-68cafa723897', 'Dr.Öğr.Üyesi', 'Yiğit ERÇAYHAN', 'Mühendislik Fak.', 'Makine Mühendisliği', '9882', 'A', '4', '411', NULL, NULL);
INSERT INTO public.professors VALUES ('58726d94-9d06-43b9-84af-5ded39138ca1', 'Öğr.Gör.Dr.', 'Murat TÜRKAN', 'Mühendislik Fak.', 'Makine Mühendisliği', '5172', 'A', '1', '130', NULL, NULL);
INSERT INTO public.professors VALUES ('9def70f4-4735-45ec-ad88-43215648dd22', 'Araş.Gör.', 'Latif Tibet AKTAŞ', 'Mühendislik Fak.', 'Makine Mühendisliği', '5165', 'MB', 'ZEMİN', '159', NULL, NULL);
INSERT INTO public.professors VALUES ('6b68e75d-fdcc-4c2a-9a4b-e217d81b2eaa', 'Prof.Dr.', 'Şeniz ERTUĞRUL', 'Mühendislik Fak.', 'Mekatronik Müh.', '8455', 'A', '4', '414', NULL, NULL);
INSERT INTO public.professors VALUES ('a695cdd7-f03e-414b-a036-2aeaeb7ecbf4', 'Prof.Dr.', 'Nuri Süha BAYINDIR', 'Mühendislik Fak.', 'Mekatronik Müh.', '8479', 'A', '1', '130', NULL, NULL);
INSERT INTO public.professors VALUES ('94e2f69b-33db-49e5-9b2e-4f0cad91c7c8', 'Prof.Dr.', 'Hira KARAGÜLLE', 'Mühendislik Fak.', 'Mekatronik Müh.', '9820', 'A', '1', '128', NULL, NULL);
INSERT INTO public.professors VALUES ('3503407d-e34f-4839-b80d-b74fa707763c', 'Dr.Öğr.Üyesi', 'Gazihan ALANKUŞ', 'Mühendislik Fak.', 'Mekatronik Müh.', '8260', 'A', '3', '308', NULL, NULL);
INSERT INTO public.professors VALUES ('ba7bbadc-ff4a-403d-bec4-048f1373e551', 'Dr.Öğr.Üyesi', 'Ebru SAYILGAN', 'Mühendislik Fak.', 'Mekatronik Müh.', '9819', 'A', '4', '418', NULL, NULL);
INSERT INTO public.professors VALUES ('04a80930-4a50-4232-8f6f-14d0f4edc617', 'Dr.Öğr.Üyesi', 'Lütfi MUTLU', 'Mühendislik Fak.', 'Mekatronik Müh.', '5128', 'A', '1', '130', NULL, NULL);
INSERT INTO public.professors VALUES ('c2cea0e0-213f-42b1-a65a-375e34baa322', 'Araş.Gör.', 'Rahime ALSANĞUR', 'Mühendislik Fak.', 'Mekatronik Müh.', '5173', 'ML', '1', '102', NULL, NULL);
INSERT INTO public.professors VALUES ('24736d52-970f-4828-ab10-5b1c758ed074', 'Araş.Gör.', 'Alperen KESER', 'Mühendislik Fak.', 'Mekatronik Müh.', '8551', 'ML', '1', '102', NULL, NULL);
INSERT INTO public.professors VALUES ('4acbde04-0e86-45f5-be48-fd48a6bca1f0', 'Doç.Dr.', 'Osman DOLUCA', 'Mühendislik Fak.', 'Biyomedikal Mühendisliği', '8272', 'A', '2', '206', NULL, NULL);
INSERT INTO public.professors VALUES ('8a429ef9-b99f-47d5-9de8-d7be07566334', 'Dr.Öğr.Üyesi', 'Tannaz AKBORPOUR', 'Mühendislik Fak.', 'Biyomedikal Mühendisliği', '8333', 'A', '5', '507', NULL, NULL);
INSERT INTO public.professors VALUES ('9c7926b9-1a92-47d2-8c2a-20399db97c08', 'Dr.Öğr.Üyesi', 'Gizem AYNA DURAN', 'Mühendislik Fak.', 'Biyomedikal Mühendisliği', '8304', 'A', '4', '410', NULL, NULL);
INSERT INTO public.professors VALUES ('1494cd2a-b110-4c26-94f2-313f5691421c', 'Öğr.Gör.Dr.', 'Gülizar ÇALIŞKAN BİLGİN', 'Mühendislik Fak.', 'Biyomedikal Mühendisliği', '8390', 'A', '2', '207', NULL, NULL);
INSERT INTO public.professors VALUES ('2882399e-935a-4ca4-98c4-bdc7d399c696', 'Araş.Gör.', 'Duygu GEÇKİN', 'Mühendislik Fak.', 'Biyomedikal Mühendisliği', '5185', 'MB', 'ZEMİN', '166', NULL, NULL);
INSERT INTO public.professors VALUES ('238a0a58-00a2-4c60-bb57-2274c5b33471', 'Araş.Gör.', 'Sude PEHLİVAN AKBUĞDAY', 'Mühendislik Fak.', 'Biyomedikal Mühendisliği', '5183', 'ML', '2', '202', NULL, NULL);
INSERT INTO public.professors VALUES ('73028d7b-a153-4535-9702-115fa132b0eb', 'Prof.Dr.', 'Diaa GADELMAVLA', 'Mühendislik Fak.', 'Havacılık ve Uzay Mühendisiliği', '8293', 'A', '2', '212', NULL, NULL);
INSERT INTO public.professors VALUES ('85f77a4c-ee35-4c48-b942-5dcfab9e525f', 'Doç.Dr.', 'Cem Tahsin YÜCER', 'Mühendislik Fak.', 'Havacılık ve Uzay Mühendisiliği', '8438', 'A', '4', '406', NULL, NULL);
INSERT INTO public.professors VALUES ('f17d95b8-63c7-4e2f-816d-eac68bae978b', 'Dr.Öğr.Üyesi', 'Fabrizio PINTO', 'Mühendislik Fak.', 'Havacılık ve Uzay Mühendisiliği', '8122', 'ML', '2', '204', NULL, NULL);
INSERT INTO public.professors VALUES ('ef60dc73-15c2-406a-826a-149bcd79f489', 'Dr.Öğr.Üyesi', 'İzzet Murat AKŞİT', 'Mühendislik Fak.', 'Havacılık ve Uzay Mühendisiliği', '8543', 'A', '2', '205', NULL, NULL);
INSERT INTO public.professors VALUES ('a09e7225-c40d-403c-8c59-c02bdf79953c', 'Dr.Öğr.Üyesi', 'Osman Nuri ŞAHİN', 'Mühendislik Fak.', 'Havacılık ve Uzay Mühendisiliği', '5147', 'A', '4', '411', NULL, NULL);
INSERT INTO public.professors VALUES ('52bbbac0-7216-41b4-8042-c7b30aacdb28', 'Dr.Öğr.Üyesi', 'Abbasali SABOKTAKİN RİZİ', 'Mühendislik Fak.', 'Havacılık ve Uzay Mühendisiliği', '8544', 'A', '2', '205', NULL, NULL);
INSERT INTO public.professors VALUES ('31f6c773-7ee7-4828-b412-dcec77404ed7', 'Araş.Gör.', 'Hasan TOTOŞ', 'Mühendislik Fak.', 'Havacılık ve Uzay Mühendisiliği', '5178', 'MB', 'ZEMİN', '159', NULL, NULL);
INSERT INTO public.professors VALUES ('2771e5de-8f4b-4c9f-959e-da9cd96ceb42', 'Araş.Gör.', 'Hacer İrem ERTEN KAPLAN', 'Mühendislik Fak.', 'Havacılık ve Uzay Mühendisiliği', '5818', 'ML', '1', '103', NULL, NULL);
INSERT INTO public.professors VALUES ('4e239523-04d1-4980-85f0-19f3da2aa7ef', 'Prof.Dr.', 'Zeynep FIRTINA KARAGONLAR', 'Mühendislik Fak.', 'Genetik ve Biyomühendislik', '8556', 'A', '4', '415', NULL, NULL);
INSERT INTO public.professors VALUES ('3e06a11d-8036-48ba-8407-16e50e14114f', 'Doç.Dr.', 'Mine GÜNGÖRMÜŞLER', 'Mühendislik Fak.', 'Genetik ve Biyomühendislik', '8392', 'A', '2', '211', NULL, NULL);
INSERT INTO public.professors VALUES ('ded2d0af-12a2-444e-9242-b8114c576273', 'Dr.Öğr.Üyesi', 'Cihangir YANDIM', 'Mühendislik Fak.', 'Genetik ve Biyomühendislik', '8343', 'A', '3', '325', NULL, NULL);
INSERT INTO public.professors VALUES ('9c74c4d9-4e8d-4767-a84e-d7a0ccb1346c', 'Dr.Öğr.Üyesi', 'Fatma Pınar GÖRDESLİ DUATEPE', 'Mühendislik Fak.', 'Genetik ve Biyomühendislik', '9824', 'A', '2', '211', NULL, NULL);
INSERT INTO public.professors VALUES ('5c1dc64d-cb35-4d10-8efd-f44f37f70f83', 'Dr.Öğr.Üyesi', 'Işınay Ebru YÜZAY', 'Mühendislik Fak.', 'Genetik ve Biyomühendislik', '9825', 'A', '2', '210', NULL, NULL);
INSERT INTO public.professors VALUES ('1db06a40-cb70-4a09-97a8-8e26107237e2', 'Dr.Öğr.Üyesi', 'Yağmur KİRAZ DURMAZ', 'Mühendislik Fak.', 'Genetik ve Biyomühendislik', '8256', 'A', '4', '410', NULL, NULL);
INSERT INTO public.professors VALUES ('f5c48c0c-a2b5-4abc-81f3-d29b4289d3bb', 'Öğr.Gör.', 'Yalçın KILIÇ', 'Mühendislik Fak.', 'Genetik ve Biyomühendislik', '8599', 'A', '1', '130', NULL, NULL);
INSERT INTO public.professors VALUES ('c50f5a97-dfda-4f0f-ac3f-74eeec1db754', 'Araş.Gör.', 'Mehmet Serdar ÇAKAN', 'Mühendislik Fak.', 'Genetik ve Biyomühendislik', '5158', 'MB', 'ZEMİN', '162', NULL, NULL);
INSERT INTO public.professors VALUES ('f072d302-f152-47cc-a557-a26c0678208c', 'Araş.Gör.', 'Sıla Naz KÖSE', 'Mühendislik Fak.', 'Genetik ve Biyomühendislik', '5161', 'ML', '1', '103', NULL, NULL);
INSERT INTO public.professors VALUES ('81a8877e-b06c-4e38-a869-57a9b01c93e4', 'Araş.Gör.', 'Hüseyin Saygın PORTAKAL', 'Mühendislik Fak.', 'Genetik ve Biyomühendislik', '5177', 'MB', 'ZEMİN', '168', NULL, NULL);
INSERT INTO public.professors VALUES ('0f1adca3-685e-4ab1-9e6a-5cbeb329519a', 'Doç.Dr.', 'Osman DOLUCA', 'Mühendislik Fak.', 'Biyomedikal Mühendisliği', '8272', 'A', '2', '206', NULL, NULL);
INSERT INTO public.professors VALUES ('c2fc3ea0-bee6-4163-adfa-d48a9cff5a22', 'Dr.Öğr.Üyesi', 'Tannaz AKBORPOUR', 'Mühendislik Fak.', 'Biyomedikal Mühendisliği', '8333', 'A', '5', '507', NULL, NULL);
INSERT INTO public.professors VALUES ('236ca3e1-e9be-43d1-906c-148723e15c4d', 'Dr.Öğr.Üyesi', 'Gizem AYNA DURAN', 'Mühendislik Fak.', 'Biyomedikal Mühendisliği', '8304', 'A', '4', '410', NULL, NULL);
INSERT INTO public.professors VALUES ('77127037-9f4f-4d6e-94e2-3412e45cc3e2', 'Öğr.Gör.Dr.', 'Gülizar ÇALIŞKAN BİLGİN', 'Mühendislik Fak.', 'Biyomedikal Mühendisliği', '8390', 'A', '2', '207', NULL, NULL);
INSERT INTO public.professors VALUES ('1e832337-3283-4b76-889b-e35f9a004ab2', 'Araş.Gör.', 'Duygu GEÇKİN', 'Mühendislik Fak.', 'Biyomedikal Mühendisliği', '5185', 'MB', 'ZEMİN', '166', NULL, NULL);
INSERT INTO public.professors VALUES ('ffb829de-462d-410d-b78c-509ebe7eb138', 'Araş.Gör.', 'Sude PEHLİVAN AKBUĞDAY', 'Mühendislik Fak.', 'Biyomedikal Mühendisliği', '5183', 'ML', '2', '202', NULL, NULL);
INSERT INTO public.professors VALUES ('f84d4243-fbc6-4810-9a8e-a072ec65317b', 'Prof.Dr.', 'Diaa GADELMAVLA', 'Mühendislik Fak.', 'Havacılık ve Uzay Mühendisiliği', '8293', 'A', '2', '212', NULL, NULL);
INSERT INTO public.professors VALUES ('6697b29c-b96b-42a6-8eaa-04aa83557e30', 'Doç.Dr.', 'Cem Tahsin YÜCER', 'Mühendislik Fak.', 'Havacılık ve Uzay Mühendisiliği', '8438', 'A', '4', '406', NULL, NULL);
INSERT INTO public.professors VALUES ('040adee1-2056-48c2-9e53-779f0a3253c2', 'Dr.Öğr.Üyesi', 'Fabrizio PINTO', 'Mühendislik Fak.', 'Havacılık ve Uzay Mühendisiliği', '8122', 'ML', '2', '204', NULL, NULL);
INSERT INTO public.professors VALUES ('53321c87-5728-4026-96a1-f3243412b00b', 'Dr.Öğr.Üyesi', 'İzzet Murat AKŞİT', 'Mühendislik Fak.', 'Havacılık ve Uzay Mühendisiliği', '8543', 'A', '2', '205', NULL, NULL);
INSERT INTO public.professors VALUES ('e37aaa72-2e97-45b6-a27f-44c83e1b47cc', 'Dr.Öğr.Üyesi', 'Osman Nuri ŞAHİN', 'Mühendislik Fak.', 'Havacılık ve Uzay Mühendisiliği', '5147', 'A', '4', '411', NULL, NULL);
INSERT INTO public.professors VALUES ('78919926-adeb-41d8-97cf-108fd16e082a', 'Dr.Öğr.Üyesi', 'Abbasali SABOKTAKİN RİZİ', 'Mühendislik Fak.', 'Havacılık ve Uzay Mühendisiliği', '8544', 'A', '2', '205', NULL, NULL);
INSERT INTO public.professors VALUES ('336727eb-4761-4aa7-ba7c-5ec50281d593', 'Araş.Gör.', 'Hasan TOTOŞ', 'Mühendislik Fak.', 'Havacılık ve Uzay Mühendisiliği', '5178', 'MB', 'ZEMİN', '159', NULL, NULL);
INSERT INTO public.professors VALUES ('c49d99ea-7a8c-4630-875b-4e4f3090d29f', 'Araş.Gör.', 'Hacer İrem ERTEN KAPLAN', 'Mühendislik Fak.', 'Havacılık ve Uzay Mühendisiliği', '5818', 'ML', '1', '103', NULL, NULL);
INSERT INTO public.professors VALUES ('0d354087-ee74-4bfb-bd47-49696776bd2c', 'Prof.Dr.', 'Zeynep FIRTINA KARAGONLAR', 'Mühendislik Fak.', 'Genetik ve Biyomühendislik', '8556', 'A', '4', '415', NULL, NULL);
INSERT INTO public.professors VALUES ('a482f8f5-0086-42be-99cf-a02f1689a321', 'Doç.Dr.', 'Mine GÜNGÖRMÜŞLER', 'Mühendislik Fak.', 'Genetik ve Biyomühendislik', '8392', 'A', '2', '211', NULL, NULL);
INSERT INTO public.professors VALUES ('a17719d6-ad37-4b28-b82a-f65b506d83b8', 'Dr.Öğr.Üyesi', 'Cihangir YANDIM', 'Mühendislik Fak.', 'Genetik ve Biyomühendislik', '8343', 'A', '3', '325', NULL, NULL);
INSERT INTO public.professors VALUES ('5e738aa0-4a8b-416e-842a-9d7755ee2f2c', 'Dr.Öğr.Üyesi', 'Fatma Pınar GÖRDESLİ DUATEPE', 'Mühendislik Fak.', 'Genetik ve Biyomühendislik', '9824', 'A', '2', '211', NULL, NULL);
INSERT INTO public.professors VALUES ('08a261d7-4887-458e-8d2a-2efa377c0455', 'Dr.Öğr.Üyesi', 'Işınay Ebru YÜZAY', 'Mühendislik Fak.', 'Genetik ve Biyomühendislik', '9825', 'A', '2', '210', NULL, NULL);
INSERT INTO public.professors VALUES ('20e476fc-40ba-4b79-8843-3f7a9ba62c1b', 'Dr.Öğr.Üyesi', 'Yağmur KİRAZ DURMAZ', 'Mühendislik Fak.', 'Genetik ve Biyomühendislik', '8256', 'A', '4', '410', NULL, NULL);
INSERT INTO public.professors VALUES ('8aa79afb-5fc7-4dd4-9f79-f4641c6de7ad', 'Öğr.Gör.', 'Yalçın KILIÇ', 'Mühendislik Fak.', 'Genetik ve Biyomühendislik', '8599', 'A', '1', '130', NULL, NULL);
INSERT INTO public.professors VALUES ('07b72842-e7f1-4582-b7a9-fdcb273a501e', 'Araş.Gör.', 'Mehmet Serdar ÇAKAN', 'Mühendislik Fak.', 'Genetik ve Biyomühendislik', '5158', 'MB', 'ZEMİN', '162', NULL, NULL);
INSERT INTO public.professors VALUES ('4cb18e72-2c4e-400b-b851-43f698959e0c', 'Araş.Gör.', 'Sıla Naz KÖSE', 'Mühendislik Fak.', 'Genetik ve Biyomühendislik', '5161', 'ML', '1', '103', NULL, NULL);
INSERT INTO public.professors VALUES ('5f581979-05b4-480a-ba8c-8fbafa9260e0', 'Araş.Gör.', 'Hüseyin Saygın PORTAKAL', 'Mühendislik Fak.', 'Genetik ve Biyomühendislik', '5177', 'MB', 'ZEMİN', '168', NULL, NULL);


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

INSERT INTO realtime.schema_migrations VALUES (20211116024918, '2025-03-31 09:17:58');
INSERT INTO realtime.schema_migrations VALUES (20211116045059, '2025-03-31 09:17:59');
INSERT INTO realtime.schema_migrations VALUES (20211116050929, '2025-03-31 09:17:59');
INSERT INTO realtime.schema_migrations VALUES (20211116051442, '2025-03-31 09:17:59');
INSERT INTO realtime.schema_migrations VALUES (20211116212300, '2025-03-31 09:17:59');
INSERT INTO realtime.schema_migrations VALUES (20211116213355, '2025-03-31 09:17:59');
INSERT INTO realtime.schema_migrations VALUES (20211116213934, '2025-03-31 09:17:59');
INSERT INTO realtime.schema_migrations VALUES (20211116214523, '2025-03-31 09:17:59');
INSERT INTO realtime.schema_migrations VALUES (20211122062447, '2025-03-31 09:18:00');
INSERT INTO realtime.schema_migrations VALUES (20211124070109, '2025-03-31 09:18:00');
INSERT INTO realtime.schema_migrations VALUES (20211202204204, '2025-03-31 09:18:00');
INSERT INTO realtime.schema_migrations VALUES (20211202204605, '2025-03-31 09:18:00');
INSERT INTO realtime.schema_migrations VALUES (20211210212804, '2025-03-31 09:18:00');
INSERT INTO realtime.schema_migrations VALUES (20211228014915, '2025-03-31 09:18:01');
INSERT INTO realtime.schema_migrations VALUES (20220107221237, '2025-03-31 09:18:01');
INSERT INTO realtime.schema_migrations VALUES (20220228202821, '2025-03-31 09:18:01');
INSERT INTO realtime.schema_migrations VALUES (20220312004840, '2025-03-31 09:18:01');
INSERT INTO realtime.schema_migrations VALUES (20220603231003, '2025-03-31 09:18:01');
INSERT INTO realtime.schema_migrations VALUES (20220603232444, '2025-03-31 09:18:01');
INSERT INTO realtime.schema_migrations VALUES (20220615214548, '2025-03-31 09:18:01');
INSERT INTO realtime.schema_migrations VALUES (20220712093339, '2025-03-31 09:18:02');
INSERT INTO realtime.schema_migrations VALUES (20220908172859, '2025-03-31 09:18:02');
INSERT INTO realtime.schema_migrations VALUES (20220916233421, '2025-03-31 09:18:02');
INSERT INTO realtime.schema_migrations VALUES (20230119133233, '2025-03-31 09:18:02');
INSERT INTO realtime.schema_migrations VALUES (20230128025114, '2025-03-31 09:18:02');
INSERT INTO realtime.schema_migrations VALUES (20230128025212, '2025-03-31 09:18:02');
INSERT INTO realtime.schema_migrations VALUES (20230227211149, '2025-03-31 09:18:02');
INSERT INTO realtime.schema_migrations VALUES (20230228184745, '2025-03-31 09:18:03');
INSERT INTO realtime.schema_migrations VALUES (20230308225145, '2025-03-31 09:18:03');
INSERT INTO realtime.schema_migrations VALUES (20230328144023, '2025-03-31 09:18:03');
INSERT INTO realtime.schema_migrations VALUES (20231018144023, '2025-03-31 09:18:03');
INSERT INTO realtime.schema_migrations VALUES (20231204144023, '2025-03-31 09:18:03');
INSERT INTO realtime.schema_migrations VALUES (20231204144024, '2025-03-31 09:18:03');
INSERT INTO realtime.schema_migrations VALUES (20231204144025, '2025-03-31 09:18:04');
INSERT INTO realtime.schema_migrations VALUES (20240108234812, '2025-03-31 09:18:04');
INSERT INTO realtime.schema_migrations VALUES (20240109165339, '2025-03-31 09:18:04');
INSERT INTO realtime.schema_migrations VALUES (20240227174441, '2025-03-31 09:18:04');
INSERT INTO realtime.schema_migrations VALUES (20240311171622, '2025-03-31 09:18:04');
INSERT INTO realtime.schema_migrations VALUES (20240321100241, '2025-03-31 09:18:05');
INSERT INTO realtime.schema_migrations VALUES (20240401105812, '2025-03-31 09:18:05');
INSERT INTO realtime.schema_migrations VALUES (20240418121054, '2025-03-31 09:18:05');
INSERT INTO realtime.schema_migrations VALUES (20240523004032, '2025-03-31 09:18:06');
INSERT INTO realtime.schema_migrations VALUES (20240618124746, '2025-03-31 09:18:06');
INSERT INTO realtime.schema_migrations VALUES (20240801235015, '2025-03-31 09:18:06');
INSERT INTO realtime.schema_migrations VALUES (20240805133720, '2025-03-31 09:18:06');
INSERT INTO realtime.schema_migrations VALUES (20240827160934, '2025-03-31 09:18:06');
INSERT INTO realtime.schema_migrations VALUES (20240919163303, '2025-03-31 09:18:06');
INSERT INTO realtime.schema_migrations VALUES (20240919163305, '2025-03-31 09:18:06');
INSERT INTO realtime.schema_migrations VALUES (20241019105805, '2025-03-31 09:18:07');
INSERT INTO realtime.schema_migrations VALUES (20241030150047, '2025-03-31 09:18:07');
INSERT INTO realtime.schema_migrations VALUES (20241108114728, '2025-03-31 09:18:07');
INSERT INTO realtime.schema_migrations VALUES (20241121104152, '2025-03-31 09:18:07');
INSERT INTO realtime.schema_migrations VALUES (20241130184212, '2025-03-31 09:18:08');
INSERT INTO realtime.schema_migrations VALUES (20241220035512, '2025-03-31 09:18:08');
INSERT INTO realtime.schema_migrations VALUES (20241220123912, '2025-03-31 09:18:08');
INSERT INTO realtime.schema_migrations VALUES (20241224161212, '2025-03-31 09:18:08');
INSERT INTO realtime.schema_migrations VALUES (20250107150512, '2025-03-31 09:18:08');
INSERT INTO realtime.schema_migrations VALUES (20250110162412, '2025-03-31 09:18:08');
INSERT INTO realtime.schema_migrations VALUES (20250123174212, '2025-03-31 09:18:08');
INSERT INTO realtime.schema_migrations VALUES (20250128220012, '2025-03-31 09:18:09');


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO storage.migrations VALUES (0, 'create-migrations-table', 'e18db593bcde2aca2a408c4d1100f6abba2195df', '2025-03-31 09:17:55.248248');
INSERT INTO storage.migrations VALUES (1, 'initialmigration', '6ab16121fbaa08bbd11b712d05f358f9b555d777', '2025-03-31 09:17:55.26072');
INSERT INTO storage.migrations VALUES (2, 'storage-schema', '5c7968fd083fcea04050c1b7f6253c9771b99011', '2025-03-31 09:17:55.263179');
INSERT INTO storage.migrations VALUES (3, 'pathtoken-column', '2cb1b0004b817b29d5b0a971af16bafeede4b70d', '2025-03-31 09:17:55.287172');
INSERT INTO storage.migrations VALUES (4, 'add-migrations-rls', '427c5b63fe1c5937495d9c635c263ee7a5905058', '2025-03-31 09:17:55.312919');
INSERT INTO storage.migrations VALUES (5, 'add-size-functions', '79e081a1455b63666c1294a440f8ad4b1e6a7f84', '2025-03-31 09:17:55.320635');
INSERT INTO storage.migrations VALUES (6, 'change-column-name-in-get-size', 'f93f62afdf6613ee5e7e815b30d02dc990201044', '2025-03-31 09:17:55.325923');
INSERT INTO storage.migrations VALUES (7, 'add-rls-to-buckets', 'e7e7f86adbc51049f341dfe8d30256c1abca17aa', '2025-03-31 09:17:55.330147');
INSERT INTO storage.migrations VALUES (8, 'add-public-to-buckets', 'fd670db39ed65f9d08b01db09d6202503ca2bab3', '2025-03-31 09:17:55.333344');
INSERT INTO storage.migrations VALUES (9, 'fix-search-function', '3a0af29f42e35a4d101c259ed955b67e1bee6825', '2025-03-31 09:17:55.33723');
INSERT INTO storage.migrations VALUES (10, 'search-files-search-function', '68dc14822daad0ffac3746a502234f486182ef6e', '2025-03-31 09:17:55.340934');
INSERT INTO storage.migrations VALUES (11, 'add-trigger-to-auto-update-updated_at-column', '7425bdb14366d1739fa8a18c83100636d74dcaa2', '2025-03-31 09:17:55.345775');
INSERT INTO storage.migrations VALUES (12, 'add-automatic-avif-detection-flag', '8e92e1266eb29518b6a4c5313ab8f29dd0d08df9', '2025-03-31 09:17:55.351335');
INSERT INTO storage.migrations VALUES (13, 'add-bucket-custom-limits', 'cce962054138135cd9a8c4bcd531598684b25e7d', '2025-03-31 09:17:55.3556');
INSERT INTO storage.migrations VALUES (14, 'use-bytes-for-max-size', '941c41b346f9802b411f06f30e972ad4744dad27', '2025-03-31 09:17:55.361117');
INSERT INTO storage.migrations VALUES (15, 'add-can-insert-object-function', '934146bc38ead475f4ef4b555c524ee5d66799e5', '2025-03-31 09:17:55.390655');
INSERT INTO storage.migrations VALUES (16, 'add-version', '76debf38d3fd07dcfc747ca49096457d95b1221b', '2025-03-31 09:17:55.393763');
INSERT INTO storage.migrations VALUES (17, 'drop-owner-foreign-key', 'f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101', '2025-03-31 09:17:55.397679');
INSERT INTO storage.migrations VALUES (18, 'add_owner_id_column_deprecate_owner', 'e7a511b379110b08e2f214be852c35414749fe66', '2025-03-31 09:17:55.401796');
INSERT INTO storage.migrations VALUES (19, 'alter-default-value-objects-id', '02e5e22a78626187e00d173dc45f58fa66a4f043', '2025-03-31 09:17:55.407184');
INSERT INTO storage.migrations VALUES (20, 'list-objects-with-delimiter', 'cd694ae708e51ba82bf012bba00caf4f3b6393b7', '2025-03-31 09:17:55.412105');
INSERT INTO storage.migrations VALUES (21, 's3-multipart-uploads', '8c804d4a566c40cd1e4cc5b3725a664a9303657f', '2025-03-31 09:17:55.421139');
INSERT INTO storage.migrations VALUES (22, 's3-multipart-uploads-big-ints', '9737dc258d2397953c9953d9b86920b8be0cdb73', '2025-03-31 09:17:55.45177');
INSERT INTO storage.migrations VALUES (23, 'optimize-search-function', '9d7e604cddc4b56a5422dc68c9313f4a1b6f132c', '2025-03-31 09:17:55.476785');
INSERT INTO storage.migrations VALUES (24, 'operation-function', '8312e37c2bf9e76bbe841aa5fda889206d2bf8aa', '2025-03-31 09:17:55.480108');
INSERT INTO storage.migrations VALUES (25, 'custom-metadata', '67eb93b7e8d401cafcdc97f9ac779e71a79bfe03', '2025-03-31 09:17:55.483312');


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 1, false);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('pgsodium.key_key_id_seq', 1, false);


--
-- Name: information_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.information_items_id_seq', 23, true);


--
-- Name: information_subitems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.information_subitems_id_seq', 20, true);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_admin
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

