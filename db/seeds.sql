insert into departments
(name)
values
('Product Development'),
('Research Development');


insert into roles
(title, salary, department_id)
values
('manager',140000,1),
('director',139000,2),
('software engineer', 120000, 2),
('sales rep',125000,1),
('hardware engineer',115000,2),
('customer service',120000,1),
('accountant', 100000, 2), 
('receptionist',89000,1),
('intern',95000,2);

insert into employees 
(first_name,last_name,role_id,manager_id)
values
  ('Robert', 'Bruce', 1, NULL),
  ('Peter', 'Greenaway', 2,null),
  ('James', 'Fraser', 3,2),
  ('Jack', 'London', 4,1),
  ('Derek', 'Jarman', 5,2),
  ('Paolo', 'Pasolini', 6,1),
  ('Heathcote', 'Williams', 7,2),
  ('Sandy', 'Powell', 8,1),
  ('Emil', 'Zola', 9,2),
  ('Sissy', 'Coalpits', 3,2),
  ('Antoinette', 'Capet', 4,1),
  ('Samuel', 'Delany', 3,2),
  ('Tony', 'Duvert', 3,2),
  ('Dennis', 'Cooper',9,2 ),
  ('Monica', 'Bellucci', 8,2),
  ('Samuel', 'Johnson', 5,2),
  ('John', 'Dryden', 6,1),
  ('Alexander', 'Pope', 5,2),
  ('Lionel', 'Johnson', 6,1),
  ('Aubrey', 'Beardsley', 5,2),
  ('Tulse', 'Luper', 3,2),
  ('William', 'Morris', 3,2),
  ('George', 'Shaw', 4,1),
  ('Arnold', 'Bennett', 5,2),
  ('Algernon', 'Blackwood', 6,1);
